export interface Problems {
    ID_Problema: number;
    Folio_Incidencia: number;
    ID_Emp: number;
    ID_Solucion: number;
    ID_Causa: number;
}

export interface ProblemsDetails {
    ID_Problema: number;
    Folio: number;
    desc_inc: string;
    tec: string;
    causa: string;
    solucion: string;
    Estado: string;
    Prioridad: string;
}

export type ProblemsNew = Omit<Problems, 'ID_Problema'>;