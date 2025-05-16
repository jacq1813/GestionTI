export interface Problems{
    ID_Problema: number;
    Folio_Incidencia: number;
    ID_Emp: number;
    ID_Solucion: number;
    ID_Causa: number;
}

export type ProblemsNew = Omit<Problems, 'ID_Problema'>;