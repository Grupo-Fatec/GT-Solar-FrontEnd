import { AxiosInstance } from "axios";
import { IProject, IInsertProject } from "@/interfaces/IProjects";

export class ProjectService {
  private path: string;
  private axiosApi: AxiosInstance;

  constructor(axiosApi: AxiosInstance) {
    this.path = "/projects";
    this.axiosApi = axiosApi;
  }

  async getAll(): Promise<IProject[]> {
    const { data } = await this.axiosApi.get<IProject[]>(`${this.path}`);
    return data;
  }

  async getById(id: string): Promise<IProject> {
    const { data } = await this.axiosApi.get<IProject>(`${this.path}/${id}`);
    return data;
  }

  async getByClientId(clientId: string): Promise<IProject[]> {
    const { data } = await this.axiosApi.get<IProject[]>(`${this.path}/${clientId}`);
    return data;
  }

  async create(adminEmail: string, project: IInsertProject): Promise<IProject> {
    const { data } = await this.axiosApi.post<IProject>(`${this.path}/${adminEmail}`, project);
    return data;
  }

  async update(projectId: string, project: IInsertProject): Promise<IProject> {
    const { data } = await this.axiosApi.put<IProject>(`${this.path}/${projectId}`, project);
    return data;
  }

  async updateAdmin(projectId: string, adminId: string): Promise<IProject> {
    const { data } = await this.axiosApi.patch<IProject>(`${this.path}/${projectId}/admin/${adminId}`);
    return data;
  }

  async updateClient(projectId: string, clientId: string): Promise<IProject> {
    const { data } = await this.axiosApi.patch<IProject>(`${this.path}/${projectId}/client/${clientId}`);
    return data;
  }

  async deleteById(id: string): Promise<void> {
    await this.axiosApi.delete(`${this.path}/${id}`);
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.axiosApi.delete(`${this.path}/many`, { data: ids });
  }
}
