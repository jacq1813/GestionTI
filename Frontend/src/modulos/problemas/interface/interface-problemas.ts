export interface Problemas{
    ID_Problema: number;
    Folio_Incidencia: number;
    ID_Emp: number;
    ID_Solucion: number;
    ID_Causa: number;
}

export type NewProblemas = Omit<Problemas, 'ID_Problema'>;