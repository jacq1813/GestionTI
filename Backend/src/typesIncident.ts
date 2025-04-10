export interface Incident {
    Folio: number;
    Descripcion: string;
    Fecha: string;
    Hora: string;
    Periodo: string;
    Estado: string;
    ID_Aula: number;
    ID_Periodo: number;
    ID_Emp: number;
    ID_Rec: number;
}

export type IncidentNew = Omit<Incident, 'Folio' | 'ID_Emp' | 'ID_Rec' | 'Periodo'> 