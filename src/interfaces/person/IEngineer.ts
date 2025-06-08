import { IPerson } from "./IPerson";

export interface IEngineer extends IPerson{
    crea: string;
    specialization: string;
    valuePerKwp: number;
}