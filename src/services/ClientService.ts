import { AxiosInstance } from "axios";
import { IClient, IInsertClient } from "@/interfaces/person/client/IClient";
import api from "@/boot/AxiosConfig";

export class ClientService {
  private route: string;
  private axiosApi: AxiosInstance;

  constructor() {
    this.route = "/clients";
    this.axiosApi = api;
  }

  async getAll(): Promise<IClient[]> {
    try {
      const response = await this.axiosApi.get<IClient[]>(this.route);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os clientes:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<IClient> {
    try {
      const response = await this.axiosApi.get<IClient>(`${this.route}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar cliente com ID ${id}:`, error);
      throw error;
    }
  }

  async create(client: IInsertClient): Promise<IClient> {
    try {
      const response = await this.axiosApi.post<IClient>(this.route, client);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      throw error;
    }
  }

  async update(id: string, client: IInsertClient): Promise<IClient> {
    try {
      const response = await this.axiosApi.put<IClient>(
        `${this.route}/${id}`,
        client
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.axiosApi.delete(`${this.route}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar cliente com ID ${id}:`, error);
      throw error;
    }
  }
}
