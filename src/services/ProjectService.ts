// services/ProjectService.ts
import { Project } from "@/types/Project";

const baseURL = "/api/projects"; // ajuste conforme sua API

export const ProjectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error("Erro ao buscar projetos");
    return response.json();
  },
  getById: async (id: number): Promise<Project> => {
    const response = await fetch(`${baseURL}/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar projeto");
    return response.json();
  },
  create: async (project: Project): Promise<Project> => {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Erro ao criar projeto");
    return response.json();
  },
  update: async (id: number, project: Project): Promise<Project> => {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Erro ao atualizar projeto");
    return response.json();
  },
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao deletar projeto");
  },
};
