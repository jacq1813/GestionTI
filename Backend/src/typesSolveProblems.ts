export interface SolveProblems {
    ID_Problema: number;
    Descripcion: string;
}

export type SolveProblemsNew = Omit<SolveProblems, 'ID_Problema'>;