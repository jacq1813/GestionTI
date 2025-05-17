export interface CauseProblem{
    ID_Causa: number;
    Nombre: string;
}

export type NewCauseProblem = Omit<CauseProblem, 'ID_Causa'>;