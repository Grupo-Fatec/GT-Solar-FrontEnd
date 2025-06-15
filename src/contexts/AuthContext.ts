import { createContext } from "react"


interface IAutgContext {
    name: string;
    email: string;
    userRole: string;
    token: string;
}

export const AuthContext = createContext<IAutgContext | undefined>(JSON.parse(localStorage.getItem("user")));
