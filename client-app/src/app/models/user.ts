export interface User {
    id: string;
    firstname: string;
    lastname: string;
    passwordHash: string;
    username: string;
    email: string;
    role: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    role?: string;
}