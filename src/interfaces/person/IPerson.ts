import { IProject } from "../IProjects";

export interface IPerson {
    id: string | null;
    name: string;
    type: string;
    email: string;
    projects: IProject[]
}