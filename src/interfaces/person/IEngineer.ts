import { IPerson } from "./IPerson";

export interface IEngineer extends IPerson{
    crea: string;
    specialization: string;
    valuePerKwh: number;
}