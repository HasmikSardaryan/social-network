export interface IUser {
    id: string,
    username: string,
    email: string,
    login: string,
    password: string,
}


export type NewUser = Omit<IUser, 'id'>