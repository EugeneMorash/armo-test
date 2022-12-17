import {instance} from "./api";


export type ResponseUserType = {
    id: number
    email: string
    access: boolean
    lastName: string
    birthDate: string
    firstName: string
}

export const appAPI = {
    getUsers() {
        return instance.get<ResponseUserType[]>('/')
    },
}