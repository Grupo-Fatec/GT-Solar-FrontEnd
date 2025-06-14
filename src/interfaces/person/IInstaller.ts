import { IPerson } from "./IPerson";

export interface IInstaller extends IPerson{
    pricePerKwp: number;
    availableDays: string;
    isAvailable: boolean;
}