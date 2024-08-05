import React, { useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonButtons,
  IonInput,
  IonItem,
  IonModal,
  IonCard,
  IonCardContent,
  IonLabel,
  IonImg,
  IonAlert,
  IonItemGroup,
  IonAvatar,
  IonCardSubtitle,
} from "@ionic/react";
import "./Tab2.css";
import { Candidata } from "../models/candidata.model";
import CandidataItem from "../components/Candidata.component";
import {
  getData,
  postData,
  updateData,
  deleteData,
} from "../services/services.service";
import { add, arrowBackOutline, star, trash } from "ionicons/icons";

const Candidatas: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [candidatas, setCandidatas] = useState<Candidata[]>([]);
  const [newCandidata, setNewCandidata] = useState<Candidata>({
    _id: "",
    imagen: "",
    nombre: "",
    edad: 0,
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await getData("candidata");
      setCandidatas(response.Candidatas);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useIonViewDidEnter(() => {
    fetchData();
  });

  const handleInsert = async () => {
    try {
      const result = await postData("candidata", newCandidata);
      setCandidatas([...candidatas, result]);
      modal.current?.dismiss();
      setNewCandidata({ _id: "", imagen: "", nombre: "", edad: 0 });
      fetchData();
    } catch (error) {
      console.error("Insert error:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateData("candidata", newCandidata._id, newCandidata);
      const updatedCandidatas = candidatas.map((cand) =>
        cand._id === newCandidata._id ? newCandidata : cand
      );
      setCandidatas(updatedCandidatas);
      modal.current?.dismiss();
      setNewCandidata({ _id: "", imagen: "", nombre: "", edad: 0 });
      setEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData("candidata", newCandidata._id); // Asume que el ID está en candidata._id
      const updatedCandidatas = candidatas.filter(
        (cand) => cand._id !== newCandidata._id
      );
      setCandidatas(updatedCandidatas);
      modal.current?.dismiss();
      // Limpiar los campos después de la eliminación
      setNewCandidata({ _id: "", imagen: "", nombre: "", edad: 0 });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  const openModalForEdit = (candidata: Candidata) => {
    setNewCandidata(candidata);
    setEditing(true);
    modal.current?.present();
  };

  const confirmAction = () => {
    if (editing) {
      handleUpdate();
    } else {
      handleInsert();
    }
  };

  const confirmDelete = () => {
    setShowAlert(true); // Mostrar el alert de confirmación
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Candidatas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {candidatas.map((candidata, idx) => (
            <CandidataItem
              key={idx}
              candidata={candidata}
              onSelect={openModalForEdit}
            />
          ))}
        </IonList>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          id="open-modal"
          onClick={() => {
            // Preparar para agregar una nueva candidata
            setNewCandidata({
              _id: "",
              imagen: "",
              nombre: "",
              edad: 0,
            });
            setEditing(false);
            modal.current?.present();
          }}
        >
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      <IonModal
        ref={modal}
        trigger="open-modal"
        onWillDismiss={(ev) => {
          if (ev.detail.role === "confirm") {
            confirmAction();
          }
        }}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton fill="clear" onClick={() => modal.current?.dismiss()}>
                <IonIcon icon={arrowBackOutline}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>
              {editing ? "Editar Candidata" : "Nueva Candidata"}
            </IonTitle>
            <IonItemGroup slot="end">
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                onClick={confirmDelete} // Mostrar alerta de confirmación
              >
                <IonIcon icon={trash} />
              </IonButton>
            </IonItemGroup>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonCard>
                  <IonImg src={newCandidata.imagen}></IonImg>
                </IonCard>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Imagen URL</IonLabel>
                <IonInput
                  value={newCandidata.imagen}
                  onIonChange={(e) =>
                    setNewCandidata({
                      ...newCandidata,
                      imagen: e.detail.value!,
                    })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  value={newCandidata.nombre}
                  onIonChange={(e) =>
                    setNewCandidata({
                      ...newCandidata,
                      nombre: e.detail.value!,
                    })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Edad</IonLabel>
                <IonInput
                  type="text"
                  value={newCandidata.edad}
                  onIonChange={(e) =>
                    setNewCandidata({
                      ...newCandidata,
                      edad: Number(e.detail.value!),
                    })
                  }
                />
              </IonItem>
            </IonCardContent>
          </IonCard>
          <div
            className="ion-justify-content-center ion-align-items-center"
            style={{ display: "flex" }}
          >
            <IonButton
              fill="solid"
              strong={true}
              onClick={() => modal.current?.dismiss({}, "confirm")}
            >
              Confirmar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Confirmar Eliminación"}
        message={"¿Estás seguro de que deseas eliminar esta candidata?"}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => console.log("Cancelado"),
          },
          {
            text: "Eliminar",
            role: "destructive",
            handler: () => handleDelete(),
          },
        ]}
      />
    </IonPage>
  );
};

export default Candidatas;
