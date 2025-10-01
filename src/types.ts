export interface IUser {
    id: string,
    name: string,
    surname: string,
    login: string,
    password: string,
    picture: string,
}

export type NewUser = Omit<IUser, 'id'|'picture'>
export type AuthUser = Pick<IUser, 'login'| 'password'>

export interface IResponse<T = unknown> {
    status: string,
    message: string,
    payload: T
}