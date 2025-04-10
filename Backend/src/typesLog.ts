export interface Log {
    ID_Bitacora: number;
    Folio_Incidencia : number;
    Fecha_Cambio: string;
    Descripcion : string;
    Estado : string;
    ID_Emp : number;
}

export type LogNew = Omit<Log, 'ID_Bitacora'>;