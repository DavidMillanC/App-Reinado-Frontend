import React from "react";
import { Calificacion } from "../models/calificacion.model";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";

interface PodiumItemProps {
  calificacion: Calificacion;
}

const PodiumItem: React.FC<PodiumItemProps> = ({ calificacion }) => {
  return (
    <IonCard>
      <div
        style={{ display: "flex", alignItems: "center", paddingLeft: "0.5rem" }}
      >
        <IonAvatar slot="start" style={{ width: "100px", height: "100px" }}>
          {calificacion.candidata.imagen ? (
            <img
              src={calificacion.candidata.imagen}
              alt={calificacion.candidata.nombre}
            />
          ) : (
            <img src="default-image-url" alt="default" /> // Usa una imagen por defecto si candidata.imagen no está disponible
          )}
        </IonAvatar>
        <IonCardHeader>
          <IonCardTitle>
            {calificacion.candidata?.nombre || "Sin nombre"}
          </IonCardTitle>
        </IonCardHeader>
      </div>

      <IonCardContent>
        <IonLabel>
          <h1>Puntaje Total: {calificacion.puntaje}</h1>
        </IonLabel>
      </IonCardContent>
    </IonCard>
  );
};

export default PodiumItem;
