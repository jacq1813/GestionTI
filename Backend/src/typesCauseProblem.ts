export interface CauseProblem{
    ID_Causa: number;
    Descripcion: string;
}

export type CauseProblemNew = Omit<CauseProblem, 'ID_Causa'>;