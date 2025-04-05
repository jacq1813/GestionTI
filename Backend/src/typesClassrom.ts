export interface Classroom {
    ID_Aula: number;
    Nombre: string;
    ID_TipoAula: number;
    ID_Edif: number;
    ID_Emp: number;
}

export type ClassroomNew = Omit<Classroom, 'ID_Aula'>;