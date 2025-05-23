export interface Incident {
    Folio: number;
    Descripcion: string;
    TipoEquipo: string;
    Fecha: string; 
    Periodo: string; 
    Estado: string; 
    Prioridad: string;
    Hora: string; 
    Aula: string; 
    TipoAula: string;
    Emisor: string;
    PuestoEmisor: string;
    Receptor: string;
    PuestoReceptor: string; 
}

export type IncidentNew = Omit<Incident, 'Folio' | 'ID_Emp' | 'ID_Rec' | 'ID_Periodo'>

export interface NewIncident {
    Descripcion: string;
    Fecha: string; 
    Hora: string; 
    ID_Aula: number; 
    ID_Periodo: number;
    Estado: string;
}
