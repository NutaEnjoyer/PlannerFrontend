export interface IAuthForm {
  email: string
  password: string
}

export interface IUser { 
    id: string 
    name?: string
    email: string

    workInterval?: string
    breakInterval?: string
    intervalsCount?: string
}

export interface IAuthResponse {
  accessToken: string
  user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string}