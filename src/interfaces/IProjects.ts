import { StatusEnum } from "@/enums/StatusEnum";
import { IAdmin } from "./person/admin/IAdmin";
import { IClient } from "./person/client/IClient";
import { IEngineer } from "./person/IEngineer";
import { IInstaller } from "./person/IInstaller";
import { IEquipments, IEquipmentsProject } from "./supplier/IEquipments";

export interface IProject {
  id: string;
  name: string;
  status: string;
  energyConsumption: number;
  engineer: IEngineer;
  client: IClient;
  createdBy: IAdmin;
  installer: IInstaller;
  equipments: IEquipments[];
  approvedValue: number;
}

export interface IInsertProject {
  id: string;
  name: string;
  clientId: string;
  engineerId: string;
  installerId: string;
  energyConsumption: number;
  equipments: IEquipmentsProject[];
}
