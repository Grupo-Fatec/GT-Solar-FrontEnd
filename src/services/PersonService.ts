import { AxiosInstance } from "axios";
import { IEngineer } from "@/interfaces/person/IEngineer";
import { IInstaller } from "@/interfaces/person/IInstaller";
import api from "@/boot/AxiosConfig";

export class PersonService {
  private path: string;
  private axiosApi: AxiosInstance;

  constructor() {
    this.path = "/persons";
    this.axiosApi = api;
  }

  // ----- CREATE -----
  async createEngineer(engineer: Omit<IEngineer, "id">): Promise<IEngineer> {
    const { data } = await this.axiosApi.post<IEngineer>(
      `${this.path}/engineers`,
      engineer
    );
    return data;
  }

  async createInstaller(installer: IInstaller): Promise<IInstaller> {
    const { data } = await this.axiosApi.post<IInstaller>(
      `${this.path}/installers`,
      installer
    );
    return data;
  }

  // ----- READ -----
  async findAllEngineers(): Promise<IEngineer[]> {
    const { data } = await this.axiosApi.get<IEngineer[]>(
      `${this.path}/engineers`
    );
    return data;
  }

  async findAllInstallers(): Promise<IInstaller[]> {
    const { data } = await this.axiosApi.get<IInstaller[]>(
      `${this.path}/installers`
    );
    return data;
  }

  async findEngineerById(id: string): Promise<IEngineer> {
    const { data } = await this.axiosApi.get<IEngineer>(
      `${this.path}/engineers/${id}`
    );
    return data;
  }

  async findInstallerById(id: string): Promise<IInstaller> {
    const { data } = await this.axiosApi.get<IInstaller>(
      `${this.path}/installers/${id}`
    );
    return data;
  }

  // ----- UPDATE -----
  async updateEngineer(id: string, engineer: IEngineer): Promise<IEngineer> {
    const { data } = await this.axiosApi.put<IEngineer>(
      `${this.path}/engineers/${id}`,
      engineer
    );
    return data;
  }

  async updateInstaller(
    id: string,
    installer: IInstaller
  ): Promise<IInstaller> {
    const { data } = await this.axiosApi.put<IInstaller>(
      `${this.path}/installers/${id}`,
      installer
    );
    return data;
  }

  // ----- DELETE -----
  async deletePerson(id: string): Promise<void> {
    await this.axiosApi.delete(`${this.path}/${id}`);
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.axiosApi.delete(`${this.path}/delete`, { data: ids });
  }
}
