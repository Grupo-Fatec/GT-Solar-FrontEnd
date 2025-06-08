export interface IAdmin{
    id: string;
    name: string;
    email: string;
    role: string;
}


export interface IInsertAdmin{
    name: string;
    email: string;
    password: string;
    adminRole: string;
}

export interface IAuthAdmin{
    name: string;
    email: string;
    userRole: string;
    token: string;
}