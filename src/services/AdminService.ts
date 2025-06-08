import { AxiosInstance } from "axios";
import { IInsertAdmin, IAdmin } from "@/interfaces/person/admin/IAdmin";

export class AdminService {
  private path: string;
  private axiosApi: AxiosInstance;

  constructor(axiosApi: AxiosInstance) {
    this.path = "/admins";
    this.axiosApi = axiosApi;
  }

  async create(admin: IInsertAdmin): Promise<IAdmin> {
    const { data } = await this.axiosApi.post<IAdmin>(`${this.path}`, admin);
    return data;
  }

  async getById(id: string): Promise<IAdmin> {
    const { data } = await this.axiosApi.get<IAdmin>(`${this.path}/${id}`);
    return data;
  }

  async getAll(): Promise<IAdmin[]> {
    const { data } = await this.axiosApi.get<IAdmin[]>(`${this.path}`);
    return data;
  }

  async update(id: string, admin: IInsertAdmin): Promise<IAdmin> {
    const { data } = await this.axiosApi.put<IAdmin>(`${this.path}/${id}`, admin);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.axiosApi.delete(`${this.path}/${id}`);
  }

  async deactivate(id: string): Promise<IAdmin> {
    const { data } = await this.axiosApi.patch<IAdmin>(`${this.path}/${id}/deactivate`);
    return data;
  }
}
