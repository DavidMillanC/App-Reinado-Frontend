import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import "./Tab3.css";
import { useRef, useState } from "react";
import { Calificacion } from "../models/calificacion.model";
import {
  getData,
  postData,
  updateData,
  deleteData,
} from "../services/services.service";
import CalificacionItem from "../components/Calificacion.component";
import { add, arrowBackOutline, trash, womanOutline } from "ionicons/icons";
import { Candidata } from "../models/candidata.model";

const Calificaciones: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [newCalificacion, setNewCalificacion] = useState<Calificacion>({
    _id: "",
    concepto: "_id",
    puntaje: 0,
    candidata: {
      _id: "",
      imagen: "",
      nombre: "",
      edad: 0,
    },
  });
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
      const response = await getData("calificacion");
      setCalificaciones(response.Calificaciones);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const fetchDataCandidatas = async () => {
    try {
      const response = await getData("candidata");
      setCandidatas(response.Candidatas);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleInsert = async () => {
    try {
      const result = await postData("calificacion", newCalificacion);
      setCalificaciones([...calificaciones, result]);
      modal.current?.dismiss();
      setNewCalificacion({
        _id: "",
        concepto: "_id",
        puntaje: 0,
        candidata: {
          _id: "",
          imagen: "",
          nombre: "",
          edad: 0,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Insert error:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateData("calificacion", newCalificacion._id, newCalificacion);
      const updatedCalificaciones = calificaciones.map((cali) =>
        cali._id === newCalificacion._id ? newCalificacion : cali
      );
      setCalificaciones(updatedCalificaciones);
      modal.current?.dismiss();
      setNewCalificacion({
        _id: "",
        concepto: "_id",
        puntaje: 0,
        candidata: {
          _id: "",
          imagen: "",
          nombre: "",
          edad: 0,
        },
      });
      setEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData("calificacion", newCalificacion._id);
      const updatedCalificaciones = calificaciones.filter(
        (cali) => cali._id !== newCalificacion._id
      );
      setCalificaciones(updatedCalificaciones);
      modal.current?.dismiss();
      setNewCalificacion({
        _id: "",
        concepto: "",
        puntaje: 0,
        candidata: {
          _id: "",
          imagen: "",
          nombre: "",
          edad: 0,
        },
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  const openModalForEdit = (calificacion: Calificacion) => {
    setNewCalificacion(calificacion);
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
  useIonViewDidEnter(() => {
    fetchData();
    fetchDataCandidatas();
  });
  const customAlertOptions = {
    header: "Candidatas",
    subHeader: "Seleccione la candidata a calificar",
    message: "Escoger una solamente",
    translucent: true,
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Puntuaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {calificaciones.map((calificacion, idx) => (
            <CalificacionItem
              key={idx}
              calificacion={calificacion}
              onSelect={openModalForEdit}
            />
          ))}
        </IonList>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          id="open-modal-puntuacion"
          onClick={() => {
            setNewCalificacion({
              _id: "",
              concepto: "",
              puntaje: 0,
              candidata: {
                _id: "",
                imagen: "",
                nombre: "",
                edad: 0,
              },
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
        trigger="open-modal-puntuacion"
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
              {editing ? "Editar Puntuación" : "Nueva Puntuación"}
            </IonTitle>
            <IonButton
              slot="end"
              fill="clear"
              color="danger"
              onClick={confirmDelete}
            >
              <IonIcon icon={trash} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Selección Candidata</IonCardTitle>
            </IonCardHeader>
            <IonItem>
              <IonIcon slot="start" icon={womanOutline}></IonIcon>
              <IonSelect
                slot="end"
                interfaceOptions={customAlertOptions}
                interface="alert"
                placeholder="Seleccione aquí"
                value={newCandidata._id}
                onIonChange={(e) => {
                  const selectedId = e.detail.value;
                  const candidata = candidatas.find(
                    (item) => item._id === selectedId
                  );
                  if (candidata) {
                    setNewCandidata(candidata);
                    setNewCalificacion((prevCalificacion) => ({
                      ...prevCalificacion,
                      candidata: candidata,
                    }));
                  }
                }}
              >
                {candidatas.map((candidata, idx) => (
                  <IonSelectOption key={idx} value={candidata._id}>
                    {candidata.nombre}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonCard>
                  {newCalificacion.candidata?.imagen ? (
                    <IonImg src={newCalificacion.candidata.imagen} />
                  ) : (
                    <IonImg src="default-image-url" />
                  )}
                </IonCard>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Concepto</IonLabel>
                <IonInput
                  value={newCalificacion.concepto}
                  onIonChange={(e) =>
                    setNewCalificacion({
                      ...newCalificacion,
                      concepto: e.detail.value!,
                    })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Puntuación</IonLabel>
                <IonInput
                  value={newCalificacion.puntaje}
                  onIonChange={(e) =>
                    setNewCalificacion({
                      ...newCalificacion,
                      puntaje: Number(e.detail.value!),
                    })
                  }
                />
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonButton
            fill="solid"
            strong={true}
            onClick={() => modal.current?.dismiss({}, "confirm")}
          >
            Confirmar
          </IonButton>
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

export default Calificaciones;
