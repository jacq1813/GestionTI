USE Gestion;

-- Insertar datos en TipoEmpleado
INSERT INTO TipoEmpleado (ID_TipEmp, Nombre) VALUES
(1, 'Administrador'),
(2, 'Usuario'),
(3, 'Técnico'),
(4, 'Jefe de taller');

-- Insertar datos en Empleado
INSERT INTO Empleado (ID_Emp, Nombre, ApellidoPat, ApellidoMat, Num_tel, Correo, ID_TipEmp, Calificacion, Contrasena) VALUES
(1, 'Juan', 'Pérez', 'Gómez', '5551234567', 'juan.perez@example.com', 1, 95, 'password123'),
(2, 'María', 'López', 'Fernández', '5552345678', 'maria.lopez@example.com', 2, 88, 'securepass456'),
(3, 'Carlos', 'Hernández', 'Ruiz', '5553456789', 'carlos.hernandez@example.com', 3, 92, 'mypassword789'),
(4, 'Ana', 'Martínez', 'Díaz', '5554567890', 'ana.martinez@example.com', 4, 85, 'passkey321'),
(5, 'Pedro', 'García', 'Sánchez', '5555678901', 'pedro.garcia@example.com', 3, 90, 'qwerty654');

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
(1, 'Lab 101 - Computación Básica', 1, 1, 1),
(2, 'Lab de Programación', 1, 1, 1),
(3, 'Lab de Redes', 1, 1, 1),
(4, 'Lab de Dispositivos Moviles', 1, 1, 1),
(5, 'Aula 201', 2, 2, 2),
(6, 'Aula 202', 2, 2, 2),
(7, 'Aula 203', 2, 2, 2),
(8, 'Aula 204', 2, 2, 2),
(9, 'Auditorio Central', 3, 3, 3),
(10, 'Auditorio Principal', 3, 3, 3),
(11, 'Biblioteca principal', 4, 4, 4),
(12, 'Sala de estudio', 4, 4, 4),
(13, 'Videoteca', 4, 4, 4),
(14, 'Cubiculos', 4, 4, 4),
(15, 'Aula Magna', 5, 5, 5),
(16, 'Sala de Conferencias principal', 5, 5, 5),
(17, 'Sala de Conferencias Postgrado', 5, 5, 5);

-- Insertar datos en TipoEquipo
INSERT INTO TipoEquipo (ID_TipEquipo, Nombre) VALUES
(1, 'Computadora'),
(2, 'Proyector'),
(3, 'Pizarrón Electrónico'),
(4, 'Impresora'),
(5, 'Servidor');

-- Insertar datos en Equipo
INSERT INTO Equipo (ID_Equip, Nombre, Fecha_Ult_Mod, Version, Fecha_Inst, ID_Aul, ID_TipEquipo) VALUES
-- Computadoras (Tipo 1)
(1, 'Dell OptiPlex 7090', '2023-03-15', '1.2.1', '2023-02-10', 101, 1),
(2, 'HP EliteDesk 800 G8', '2023-04-20', '1.3.0', '2023-03-12', 102, 1),
(3, 'Apple Mac Mini M2 2023', '2023-05-10', '2.0.0', '2023-04-05', 103, 1),
-- Proyectores (Tipo 2)
(4, 'Epson EB-1785W', '2023-06-18', '2.1.3', '2023-05-15', 201, 2),
(5, 'BenQ MH560', '2023-07-22', '1.9.2', '2023-06-10', 202, 2),
-- Pizarras (Tipo 3)
(6, 'Smart Board 7000R', '2023-08-30', '3.2.1', '2023-07-20', 301, 3),
(7, 'Promethean ActivPanel 9', '2023-09-12', '3.5.0', '2023-08-25', 302, 3),
-- Impresoras (Tipo 4)
(8, 'HP Color LaserJet Pro M454dn', '2023-10-05', '1.4.2', '2023-09-15', 401, 4),
(9, 'Brother MFC-L8900CDW', '2023-11-18', '2.0.1', '2023-10-10', 402, 4),
-- Servidores (Tipo 5)
(10, 'Dell PowerEdge R760', '2023-12-10', '5.1.0', '2023-11-20', 501, 5),
(11, 'HPE ProLiant DL380 Gen11', '2024-01-25', '5.2.1', '2023-12-15', 502, 5);

-- Insertar datos en TipoComponente
INSERT INTO TipoComponente (ID_TipComp, Nombre) VALUES
(1, 'Procesador'),
(2, 'Memoria RAM'),
(3, 'Disco Duro'),
(4, 'Tarjeta de Video'),
(5, 'Fuente de Poder');
(6, 'Placa Madre'),
(7, 'Periférico'),
(8, 'Componente de Red'),
(9, 'Refrigeración'),
(10, 'Monitor');

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


INSERT INTO Almacen (Nombre, ID_TipComp, Cantidad_disponible, Cantidad_no_funcional, Proveedor, Fecha_ultima_reposicion) VALUES
-- PROCESADORES (Tipo 1)
('AMD Ryzen 5 5600', 1, 11, 1, 'AMD', '2024-02-10'),
('Intel Core i3-10100', 1, 10, 0, 'Intel', '2024 05-15'),
('Intel Core i5-10400', 1, 11, 1, 'Intel', '2024-11-05'),
('AMD Ryzen 5 7600', 1, 10, 0, 'AMD', '2025-01-15'),
-- PLACAS MADRE (Tipo 6)
('Gigabyte B550M', 6, 8, 0, 'Gigabyte', '2024-07-12'),
('MSI Pro H610M', 6, 9, 1, 'MSI', '2024-09-30'),
('ASUS TUF B650', 6, 6, 0, 'ASUS', '2025-02-20'),
-- MEMORIA RAM (Tipo 2)
('Memoria 4GB DDR4', 2, 20, 2, 'Kingston', '2024-04-25'),
('Memoria 8GB DDR4', 2, 20, 0, 'Kingston', '2024-04-25'),
('Memoria 16GB DDR4', 2, 10, 1, 'Kingston', '2024-06-14'),
-- ALMACENAMIENTO (Tipo 3)
('SSD 500GB', 3, 25, 2, 'Kingston', '2024-01-30'),
('SSD 1TB', 3, 15, 0, 'Kingston', '2024-05-20'),
('HDD 1TB', 3, 15, 0, 'Kingston', '2024-08-05'),
('HDD 2TB', 3, 10, 1, 'Kingston', '2024-08-05'),
-- TARJETAS GRÁFICAS (Tipo 4)
('NVIDIA GTX 1650', 4, 6, 1, 'NVIDIA', '2024-07-18'),
('Intel Arc A380', 4, 5, 0, 'Intel', '2024-11-12'),
('AMD Radeon RX 7600', 4, 4, 0, 'AMD', '2025-01-25'),
-- FUENTES DE PODER (Tipo 5)
('Fuente 500W 80+ Bronze', 5, 12, 0, 'EVGA', '2024-02-28'),
('Fuente 650W 80+ Gold', 5, 8, 0, 'Corsair', '2024-06-22'),
('Fuente 750W 80+ Platinum', 5, 5, 0, 'Seasonic', '2025-03-05'),
-- PERIFÉRICOS (Tipo 7)
('Teclado USB', 7, 40, 2, 'Logitech', '2024-04-10'),
('Mouse USB', 7, 40, 3, 'Microsoft', '2024-08-28'),
-- MONITORES (Tipo 10)
('Monitor 24" FHD', 10, 12, 0, 'Dell', '2024-12-03'),
('Monitor 27" QHD', 10, 6, 0, 'LG', '2025-02-15'),
-- COMPONENTES DE RED (Tipo 8)
('Switch 8 Puertos Gigabit', 8, 6, 0, 'TP-Link', '2024-05-08'),
('Router WiFi 5 Dual-Band', 8, 5, 0, 'D-Link', '2024-07-25'),
('Tarjeta de Red PCIe Gigabit', 8, 8, 0, 'Intel', '2024-10 18'),
-- REFRIGERACIÓN (Tipo 9)
('Ventilador CPU 120mm', 9, 20, 1, 'Cooler Master', '2024-03-22'),
('Pasta Térmica 3.5g', 9, 15, 0, 'Arctic', '2024-06-05');