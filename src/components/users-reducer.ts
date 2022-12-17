import {appAPI, ResponseUserType} from "../api/users-api";
import {AppThunkType} from "../app/store";
import {AxiosError} from "axios";
import {setLoadingAC} from "../app/app-reducer";


const initialState = {
    users: [] as ResponseUserType[]
}

export type UsersStateType = typeof initialState

export type UsersActionType =
    | getUsersAT


type getUsersAT = ReturnType<typeof getUsersAC>

export const usersReducer = (state: UsersStateType = initialState, action: UsersActionType): UsersStateType => {
    switch (action.type) {
        case 'GET-USERS':
            return {
                ...state,
                users: action.users
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

//* # Thunk Creator

export const getUsersTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))
        appAPI.getUsers()
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