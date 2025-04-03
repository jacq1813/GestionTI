USE Gestion;

-- Insertar datos en TipoEmpleado
INSERT INTO TipoEmpleado (ID_TipEmp, Nombre) VALUES
(1, 'Administrador'),
(2, 'Usuario'),
(3, 'Técnico'),
(4, 'Jefe de taller');

-- Insertar datos en Empleado
INSERT INTO Empleado (ID_Emp, Nombre, ApellidoPat, ApellidoMat, Fecha_Nac, Num_tel, Correo, ID_TipEmp, Calificacion, Contrasena) VALUES
(1, 'Juan', 'Pérez', 'Gómez', '1985-06-15', '5551234567', 'juan.perez@example.com', 1, 95, 'password123'),
(2, 'María', 'López', 'Fernández', '1990-02-20', '5552345678', 'maria.lopez@example.com', 2, 88, 'securepass456'),
(3, 'Carlos', 'Hernández', 'Ruiz', '1978-11-30', '5553456789', 'carlos.hernandez@example.com', 3, 92, 'mypassword789'),
(4, 'Ana', 'Martínez', 'Díaz', '1983-07-10', '5554567890', 'ana.martinez@example.com', 4, 85, 'passkey321'),
(5, 'Pedro', 'García', 'Sánchez', '1995-03-25', '5555678901', 'pedro.garcia@example.com', 3, 90, 'qwerty654');

-- Insertar datos en TipoDepartamento
INSERT INTO TipoDepartamento (ID_TipDpto, Nombre) VALUES
(1, 'Administración'),
(2, 'Académico'),
(3, 'Mantenimiento'),
(4, 'Seguridad'),
(5, 'Servicios Generales');

-- Insertar datos en Edificio
INSERT INTO Edificio (ID_Edif, Nombre, ID_Emp, ID_TipDpto) VALUES
(1, 'Edificio A', 1, 1),
(2, 'Edificio B', 2, 2),
(3, 'Edificio C', 3, 3),
(4, 'Edificio D', 4, 4),
(5, 'Edificio E', 5, 5);

-- Insertar datos en TipoAula
INSERT INTO TipoAula (ID_TipoAula, Nombre) VALUES
(1, 'Laboratorio de Computo'),
(2, 'Aula Regular'),
(3, 'Auditorio'),
(4, 'Biblioteca'),
(5, 'Sala de Conferencias');

-- Insertar datos en Aula
INSERT INTO Aula (ID_Aul, Nombre, ID_TipoAula, ID_Edif, ID_Emp) VALUES
(1, 'Lab 101', 1, 1, 1),
(2, 'Aula 202', 2, 2, 2),
(3, 'Auditorio Central', 3, 3, 3),
(4, 'Biblioteca General', 4, 4, 4),
(5, 'Sala Magna', 5, 5, 5);

-- Insertar datos en TipoEquipo
INSERT INTO TipoEquipo (ID_TipEquipo, Nombre) VALUES
(1, 'Computadora'),
(2, 'Proyector'),
(3, 'Pizarrón Electrónico'),
(4, 'Impresora'),
(5, 'Servidor');

-- Insertar datos en Equipo
INSERT INTO Equipo (ID_Equip, Nombre, Fecha_Ult_Mod, Version, Fecha_Inst, ID_Aul, ID_TipEquipo) VALUES
(1, 'PC Dell 1', '2023-01-10', 'V1.0', '2022-12-05', 1, 1),
(2, 'Proyector Epson', '2023-02-15', 'V2.1', '2023-01-20', 2, 2),
(3, 'Pizarrón Interactivo', '2023-03-01', 'V3.0', '2023-02-10', 3, 3),
(4, 'HP LaserJet', '2023-04-10', 'V1.2', '2023-03-25', 4, 4),
(5, 'Servidor Principal', '2023-05-05', 'V4.5', '2023-04-15', 5, 5);

-- Insertar datos en TipoComponente
INSERT INTO TipoComponente (ID_TipComp, Nombre) VALUES
(1, 'Procesador'),
(2, 'Memoria RAM'),
(3, 'Disco Duro'),
(4, 'Tarjeta de Video'),
(5, 'Fuente de Poder');

-- Insertar datos en Componente
INSERT INTO Componente (ID_Comp, Nombre, Fecha_Ult_Mod, Version, Fecha_Inst, ID_Equip, ID_TipComp) VALUES
(1, 'Intel i7', '2023-06-10', '11th Gen', '2023-06-05', 1, 1),
(2, 'Kingston 16GB', '2023-07-15', 'DDR4', '2023-07-10', 1, 2),
(3, 'SSD Samsung 1TB', '2023-08-01', 'EVO 870', '2023-07-25', 1, 3),
(4, 'NVIDIA RTX 3060', '2023-09-10', 'Ampere', '2023-09-05', 1, 4),
(5, 'Corsair 750W', '2023-10-05', 'Gold', '2023-09-30', 1, 5);

-- Insertar datos en Periodos
INSERT INTO Periodos (ID_Periodo, Nombre) VALUES
(1, 'Enero - Junio 2023'),
(2, 'Julio - Diciembre 2023'),
(3, 'Enero - Junio 2024'),
(4, 'Julio - Diciembre 2024'),
(5, 'Enero - Junio 2025');

-- Insertar datos en Incidencia
INSERT INTO Incidencia (Folio, Descripcion, Fecha, ID_Periodo, Estado, Prioridad, Hora, ID_Aula, ID_Emi, ID_Rec) VALUES
(1, 'Computadora no enciende', '2023-02-01', 1, 'En proceso', 'Baja', '08:30:00', 1, 2, 3),
(2, 'Proyector con imagen distorsionada', '2023-03-05', 1, 'Terminada', 'Mediana', '10:15:00', 2, 3, 4),
(3, 'Pizarrón sin respuesta táctil', '2023-04-10', 1, 'Liberada', 'Alta', '12:45:00', 3, 4, 5),
(4, 'Impresora atascada', '2023-05-20', 1, 'Rechazada', 'Mediana', '14:00:00', 4, 5, 1),
(5, 'Servidor caído', '2023-06-30', 1, 'En proceso', 'Crítico', '16:30:00', 5, 1, 2);
