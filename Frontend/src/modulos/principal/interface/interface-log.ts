export interface Log {
    ID_Bitacora: number;
    Folio_Incidencia: number;
    Fecha_Cambio: string;
    Estado: string;
    Descripcion: string;
    ID_Emp: number;
}
export type LogNew = Omit<Log, 'ID_Bitacora'>;