export interface Employee{
    ID_Emp: number;
    Nombre: string;
    ApellidoPat: string;
    ApellidoMat: string;
    Num_tel: string;
    ID_TipEmp: Number;
    Calificacion: Number;
    Correo: string;
    Contrasena: string;
}

export type NewEmployee = Omit<Employee, 'ID_Emp'>;
export type EmployeeUpdate = Partial<Employee> & { ID_Emp: number };