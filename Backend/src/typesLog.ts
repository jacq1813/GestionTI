export interface Log {
    ID_Bitacora: number;
    Folio_Incidencia : number;
    Fecha_Cambio: string;
    Descripcion : string;
    Estado : string;
    ID_Emp : number;
}

export type LogNew = Omit<Log, 'ID_Bitacora'>;

export interface LogD{
    ID_Bitacora: number;
    Folio_Incidencia: number;
    Fecha_Cambio: string;
    Estado: string;
    Descripcion_Bitacora: string;
    Descripcion_Incidencia: string;
    Fecha_Incidencia: string;
    Prioridad: string;
    Hora: string;
    Edificio: string;
    Aula: string;
    Tipo_Aula: string;
    Emisor: string;
    Receptor: string;
    Version: string;
}

