import axios from "axios";
import { IClient } from "@/interfaces/IClient";

const BASE_URL = "http://localhost:8082/clients";

export class ClientService {
  static async getAll(): Promise<IClient[]> {
    const response = await axios.get<IClient[]>(BASE_URL);
    return response.data;
  }

  static async getById(id: string): Promise<IClient> {
    const response = await axios.get<IClient>(`${BASE_URL}/${id}`);
    return response.data;
  }

  static async create(client: IClient): Promise<IClient> {
    const response = await axios.post<IClient>(BASE_URL, client);
    return response.data;
  }

  static async update(id: string, client: IClient): Promise<IClient> {
    const response = await axios.put<IClient>(`${BASE_URL}/${id}`, client);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  }
}
