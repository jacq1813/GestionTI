export interface DeviceT {
    id: number;
    Nombre: string;
    
}
export type DeviceTNew = Omit<DeviceT, 'id'>;