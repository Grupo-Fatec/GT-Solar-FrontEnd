import api from "@/boot/AxiosConfig";
import { AxiosInstance } from "axios";

export class AuthService {
  private route: string;
  private axiosApi: AxiosInstance;

  constructor() {
    this.route = "/auth";
    this.axiosApi = api;
  }

  async login(email: string, password: string) {
    try {
      const response = await this.axiosApi.post(`${this.route}/login`, {
        email,
        password,
      });
      if (response.status !== 200) {
        return response
      }
      localStorage.setItem("user", JSON.stringify(response.data));
      return response;
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.axiosApi.post(`${this.route}/logout`);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Erro ao tentar fazer logout:", error);
      throw error;
    }
  }
}
