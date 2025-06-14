import { AxiosInstance, AxiosResponse } from "axios";
import { ISupplier } from "@/interfaces/supplier/ISupplier";
import api from "@/boot/AxiosConfig";

export class SupplierService {
  private baseUrl = "/suppliers";
  private axiosApi: AxiosInstance;
  constructor() {
    this.axiosApi = api;
  }

  async getAll(): Promise<any> {
    const response: AxiosResponse<ISupplier[]> = await this.axiosApi.get(this.baseUrl);
    return response.data;
  }

  async getById(id: string): Promise<ISupplier> {
    const response: AxiosResponse<ISupplier> = await this.axiosApi.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(supplier: Omit<ISupplier, "id">): Promise<ISupplier> {
    const response: AxiosResponse<ISupplier> = await this.axiosApi.post(this.baseUrl, supplier);
    return response.data;
  }

  async update(id: string, supplier: Omit<ISupplier, "id">): Promise<ISupplier> {
    const response: AxiosResponse<ISupplier> = await this.axiosApi.put(`${this.baseUrl}/${id}`, supplier);
    return response.data;
  }

  async delete(id: string): Promise<any> {
    const res = await this.axiosApi.delete(`${this.baseUrl}/${id}`);
    return res;
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.axiosApi.delete(this.baseUrl, { data: ids });
  }
}
