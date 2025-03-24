export interface Building {
    ID_Edif: number;
    Nombre: string;
    ID_Emp: number;
    ID_TipDpto: number;
    Nombre_Departamento: string;
}

export type BuildingNew = Omit<Building, 'ID_Edif' | 'Nombre_Departamento'>;