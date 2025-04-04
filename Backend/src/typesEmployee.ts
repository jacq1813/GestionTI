export interface Employee {
    ID_Emp: number;
    Nombre: string;
    ApellidoPat: string;
    ApellidoMat: string;
    Num_tel: string;
    ID_TipEmp: number;
    Calificacion: number;
    Correo: string;
    Contrasena: string;
}

export type EmployeeNew = Omit<Employee, 'ID_Emp'>;