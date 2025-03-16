export interface Incident {
    Folio: number;
    Descripcion: string;
    Fecha: string; 
    Periodo: string; 
    Estado: "Bajo" | "Medio" | "Alto"; 
    Hora: string; 
    Aula: string; 
    TipoAula: string;
    Emisor: string;
    PuestoEmisor: string;
    Receptor: string;
    PuestoReceptor: string; 
}
