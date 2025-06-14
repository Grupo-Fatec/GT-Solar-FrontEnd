import { AxiosInstance } from "axios";
import { IEquipments } from "@/interfaces/supplier/IEquipments";
import api from "@/boot/AxiosConfig";

export class EquipmentService {
  private path: string;
  private axiosApi: AxiosInstance;

  constructor() {
    this.path = "/equipments";
    this.axiosApi = api;
  }

  // ----- CREATE -----
  async create(equipment: IEquipments): Promise<IEquipments> {
    const { data } = await this.axiosApi.post<IEquipments>(`${this.path}`, equipment);
    return data;
  }

  // ----- READ -----
  async findAll(): Promise<IEquipments[]> {
    const { data } = await this.axiosApi.get<IEquipments[]>(`${this.path}`);
    return data;
  }

  async findOne(id: string): Promise<IEquipments> {
    const { data } = await this.axiosApi.get<IEquipments>(`${this.path}/${id}`);
    return data;
  }

  // ----- UPDATE -----
  async update(id: string, equipment: IEquipments): Promise<IEquipments> {
    const { data } = await this.axiosApi.put<IEquipments>(`${this.path}/${id}`, equipment);
    return data;
  }

  // ----- DELETE -----
  async delete(id: string): Promise<void> {
    await this.axiosApi.delete(`${this.path}/${id}`);
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.axiosApi.delete(`${this.path}`, { data: ids });
  }
}
