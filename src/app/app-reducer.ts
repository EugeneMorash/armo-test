import {appAPI, ResponseUserType} from "../api/app-api";
import {AppThunkType} from "./store";
import {AxiosError} from "axios";


const initialState = {
    users: [] as ResponseUserType[]
}

export type AppStateType = typeof initialState

export type AppActionType =
    | getUsersAT


type getUsersAT = ReturnType<typeof getUsersAC>

export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
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
        // dispatch(setLoadingAC(true))
        appAPI.getUsers()
            .then((res) => {
                dispatch(getUsersAC(res.data))
            })
            .catch((e: AxiosError) => {
                alert(e)
            })
            // .finally(() => {
            //     dispatch(setLoadingAC(false))
            // })
    }
    }