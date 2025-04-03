CREATE DATABASE Gestion;
USE Gestion;

CREATE TABLE TipoEmpleado (
    ID_TipEmp INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Empleado (
    ID_Emp INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    ApellidoPat VARCHAR(100) NOT NULL,
    ApellidoMat VARCHAR(100),
    Fecha_Nac DATE NOT NULL,
    Num_tel VARCHAR(15),
    ID_TipEmp INT,
    Calificacion INT,
    Correo VARCHAR(100) NOT NULL,
    Contrasena VARCHAR(100) NOT NULL,
    FOREIGN KEY (ID_TipEmp) REFERENCES TipoEmpleado(ID_TipEmp)
);

CREATE TABLE TipoDepartamento (
    ID_TipDpto INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Edificio (
    ID_Edif INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    ID_Emp INT,
    ID_TipDpto INT,
    FOREIGN KEY (ID_Emp) REFERENCES Empleado(ID_Emp),
    FOREIGN KEY (ID_TipDpto) REFERENCES TipoDepartamento(ID_TipDpto)
);

CREATE TABLE TipoAula (
    ID_TipoAula INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Aula (
    ID_Aul INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    ID_TipoAula INT,
    ID_Edif INT,
    ID_Emp INT,
    FOREIGN KEY (ID_TipoAula) REFERENCES TipoAula(ID_TipoAula),
    FOREIGN KEY (ID_Edif) REFERENCES Edificio(ID_Edif),
    FOREIGN KEY (ID_Emp) REFERENCES Empleado(ID_Emp)
);

CREATE TABLE TipoEquipo (
    ID_TipEquipo INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Equipo (
    ID_Equip INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Fecha_Ult_Mod DATE,
    Version VARCHAR(50),
    Fecha_Inst DATE,
    ID_Aul INT,
    ID_TipEquipo INT,
    FOREIGN KEY (ID_Aul) REFERENCES Aula(ID_Aul),
    FOREIGN KEY (ID_TipEquipo) REFERENCES TipoEquipo(ID_TipEquipo)
);

CREATE TABLE TipoComponente (
    ID_TipComp INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Componente (
    ID_Comp INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Fecha_Ult_Mod DATE,
    Version VARCHAR(50),
    Fecha_Inst DATE,
    ID_Equip INT,
    ID_TipComp INT,
    FOREIGN KEY (ID_Equip) REFERENCES Equipo(ID_Equip),
    FOREIGN KEY (ID_TipComp) REFERENCES TipoComponente(ID_TipComp)
);

CREATE TABLE Periodos (
    ID_Periodo INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Incidencia (
    Folio INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion TEXT NOT NULL,
    Fecha DATE NOT NULL,
    Periodo VARCHAR(50),
    Estado VARCHAR(10),
    Prioridad VARCHAR(10),
    Hora TIME NOT NULL,
    ID_Aula INT,
    ID_Periodo INT,
    ID_Emi INT,
    ID_Rec INT,
    FOREIGN KEY (ID_Aula) REFERENCES Aula(ID_Aul),
    FOREIGN KEY (ID_Periodo) REFERENCES Periodos(ID_Periodo),
    FOREIGN KEY (ID_Emi) REFERENCES Empleado(ID_Emp),
    FOREIGN KEY (ID_Rec) REFERENCES Empleado(ID_Emp)
);