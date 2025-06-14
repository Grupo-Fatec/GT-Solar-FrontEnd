import { IEquipments } from "./IEquipments";

export interface ISupplier{
    id: string;
    name: string;
    email: string;
    deliveryDate: string;
    equipments: IEquipments[]
}