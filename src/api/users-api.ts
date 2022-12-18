import {instance} from "./api";


export type ResponseUserType = {
    id: number
    email: string
    access: boolean
    lastName: string
    birthDate: string
    firstName: string
}

export const userAPI = {
    getUsers() {
        return instance.get<ResponseUserType[]>('/')
    },
    deleteUser(id: number) {
        return instance.delete<ResponseUserType>(`/${id}`)
    },
    changeAccessStatus(id: number, access: boolean) {
        return instance.put<ResponseUserType>(`/${id}`, {access})
    }
}