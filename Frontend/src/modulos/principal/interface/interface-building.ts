export interface Building {
    ID_Edif: number;
    Nombre: string;
    ID_Emp: number;
    ID_TipDpto: number;
    Nombre_Departamento: string;
}
//omitir ID_Edif y Nombre_Departamento
export type NewBuilding = Omit<Building, 'ID_Edif' | 'Nombre_Departamento'>;