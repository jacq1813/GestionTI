USE Gestion;

-- Insertar datos en BitacoraIncidencias
INSERT INTO BitacoraIncidencias (ID_Bitacora, Folio_Incidencia, Fecha_Cambio, Accion, Descripcion, Estado_anterior, Estado_nuevo, ID_Emp) VALUES
(1, 1, '2023-02-02', 'Actualización', 'Se revisó la computadora y se detectó un problema en la fuente de poder.', 'En proceso', 'Liberada', 1),
(2, 2, '2023-03-06', 'Cierre', 'El proyector fue reparado y está funcionando correctamente.', 'Terminada', 'Cerrada', 2);
