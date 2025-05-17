export interface SolveProblem {
    ID_Solucion: number;
    Descripcion: string;
}

export type NewSolveProblem = Omit<SolveProblem, 'ID_Solucion'>;