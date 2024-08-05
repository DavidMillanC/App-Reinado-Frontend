import { Candidata } from "./candidata.model";

export interface Calificacion {
    _id: string;
    concepto: string;
    puntaje: number;
    candidata: Candidata;
}