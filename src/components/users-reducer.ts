import {userAPI, ResponseUserType} from "../api/users-api";
import {AppThunkType} from "../app/store";
import {AxiosError} from "axios";
import {setLoadingAC} from "../app/app-reducer";


const initialState = {
    users: [] as ResponseUserType[]
}

export type UsersStateType = typeof initialState

export type UsersActionType =
    | getUsersAT
    | deleteUserAT
    | changeAccessStatusAT


type getUsersAT = ReturnType<typeof getUsersAC>
type deleteUserAT = ReturnType<typeof deleteUserAC>
type changeAccessStatusAT = ReturnType<typeof changeAccessStatusAC>

export const usersReducer = (state: UsersStateType = initialState, action: UsersActionType): UsersStateType => {
    switch (action.type) {
        case 'GET-USERS':
            return {
                ...state,
                users: action.users
            }
        case 'DELETE-USER':
            return {
                ...state,
                users: state.users.filter((u) => u.id !== action.id)
            }
        case 'CHANGE-ACCESS-STATUS':
            return {
                ...state,
                users: state.users.map((u) => {
                    return u.id === action.id ? {...u, access: action.isAccess} : u
                })
            }
        default:
            return state;
    }
}

//* # Action Creator

export const getUsersAC = (users: ResponseUserType[]) => ({
    type: 'GET-USERS',
    users
}) as const

export const deleteUserAC = (id: number) => ({
    type: 'DELETE-USER',
    id
}) as const

export const changeAccessStatusAC = (id: number, isAccess: boolean) => ({
    type: 'CHANGE-ACCESS-STATUS',
    id,
    isAccess
}) as const

//* # Thunk Creator

export const getUsersTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))
        userAPI.getUsers()
            .then((res) => {
                dispatch(getUsersAC(res.data))
            })
            .catch((e: AxiosError) => {
                alert(e)
            })
            .finally(() => {
                dispatch(setLoadingAC(false))
            })
    }
}

export const deleteUserTC = (id: number): AppThunkType => {
    return (dispatch) => {
        userAPI.deleteUser(id)
            .then(() => {
                dispatch(deleteUserAC(id))
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })
    }
}

export const changeAccessStatusTC = (id: number, isAccess: boolean): AppThunkType => {
    return (dispatch) => {
        userAPI.changeAccessStatus(id, isAccess)
            .then(() => {
                dispatch(changeAccessStatusAC(id, isAccess))
            })
            .catch((e: AxiosError) => {
                alert(e.message)
            })
    }
}