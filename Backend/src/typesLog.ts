export interface Log {
    ID_Bitacora: number;
    Folio_Incidencia : number;
    Fecha_Cambio: string;
    Accion : string;
    Descripcion : string;
    Estado_anterior : string;
    Estado_nuevo : string;
    ID_Emp : number;
}

export type LogNew = Omit<Log, 'ID_Bitacora'>;