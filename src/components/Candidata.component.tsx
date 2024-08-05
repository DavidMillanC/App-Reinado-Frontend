import React from "react";
import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { Candidata } from "../models/candidata.model";

interface CandidataItemProps {
  candidata: Candidata;
  onSelect: (candidata: Candidata) => void;
}

const CandidataItem: React.FC<CandidataItemProps> = ({
  candidata,
  onSelect,
}) => {
  return (
    <IonCard button onClick={() => onSelect(candidata)}>
      <div
        style={{ display: "flex", alignItems: "center", paddingLeft: "0.5rem" }}
      >
        <IonAvatar slot="start">
          <img src={candidata.imagen} />
        </IonAvatar>
        <IonCardHeader>
          <IonCardTitle>{candidata.nombre}</IonCardTitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
};

export default CandidataItem;
