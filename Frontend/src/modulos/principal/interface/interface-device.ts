export interface Device {
    ID_Equip: number;
    Nombre: string;  // Cambié de Equipo_Nombre a Nombre para coincidir con la consulta
    Fecha_Ult_Mod: string;
    Version: string;
    Fecha_Inst: string;
    TipoEquipo_Nombre: string;
    Aula_Nombre: string;
    // Campos para componentes concatenados (resultado de GROUP_CONCAT)
    Componentes_Nombres: string;  // Nombres concatenados de los componentes
    Componentes_Fecha_Ult_Mod: string;  // Fechas de modificación concatenadas
    Componentes_Version: string;  // Versiones concatenadas
    Componentes_Fecha_Inst: string;  // Fechas de instalación concatenadas
}
