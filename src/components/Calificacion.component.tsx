import React from "react";
import { Calificacion } from "../models/calificacion.model";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
} from "@ionic/react";

interface CalificacionItemProps {
  calificacion: Calificacion;
  onSelect: (calificacion: Calificacion) => void;
}

const CalificacionItem: React.FC<CalificacionItemProps> = ({
  calificacion,
  onSelect,
}) => {
  const { candidata } = calificacion;

  return (
    <IonCard button onClick={() => onSelect(calificacion)}>
      <div
        style={{ display: "flex", alignItems: "center", paddingLeft: "0.5rem" }}
      >
        <IonAvatar slot="start">
          {candidata?.imagen ? (
            <img src={candidata.imagen} alt={candidata.nombre} />
          ) : (
            <img src="default-image-url" alt="default" /> // Usa una imagen por defecto si candidata.imagen no está disponible
          )}
        </IonAvatar>
        <IonCardHeader>
          <IonCardTitle>{candidata?.nombre || "Sin nombre"}</IonCardTitle>
        </IonCardHeader>
      </div>

      <IonCardContent>
        <IonLabel>
          <h2>Concepto: {calificacion.concepto}</h2>
          <p>Puntaje: {calificacion.puntaje}</p>
        </IonLabel>
      </IonCardContent>
    </IonCard>
  );
};

export default CalificacionItem;
