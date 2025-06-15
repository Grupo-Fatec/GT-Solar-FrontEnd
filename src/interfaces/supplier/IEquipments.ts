export interface IEquipments{
    id: string | null;
    name: string;
    type: string;
    power: string;
    price: number;
    guarantee: string;
    supplierId: string;
}

export interface IEquipmentsProject extends IEquipments {
    quantity: number;
}