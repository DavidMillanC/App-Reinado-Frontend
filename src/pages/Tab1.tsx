import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useState } from "react";
import { Calificacion } from "../models/calificacion.model";
import { getData } from "../services/services.service";
import CalificacionItem from "../components/Calificacion.component";
import PodiumItem from "../components/Podium.component";

const Resultados: React.FC = () => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);

  const fetchData = async () => {
    try {
      const response = await getData("podium");
      setCalificaciones(response.podium);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useIonViewDidEnter(() => {
    fetchData();
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {calificaciones.map((calificacion, idx) => (
            <PodiumItem key={idx} calificacion={calificacion} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Resultados;
