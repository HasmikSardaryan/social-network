export interface IUser {
    id: string,
    name: string,
    surname: string,
    login: string,
    password: string,
}

export type NewUser = Omit<IUser, 'id'>

export interface IResponse {
    status: string,
    message: string
}