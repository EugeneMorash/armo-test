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
//
// export const addTodoAC = (item: ResTodosType) => ({
//     type: 'TODOS/ADD-TODO',
//     item
// }) as const
//
// export const removeTodoAC = (todolistId: string) => ({
//     type: 'TODOS/REMOVE-TODO',
//     todolistId
// }) as const
//
// export const updateTodoAC = (todolistId: string, title: string) => ({
//     type: 'TODOS/UPDATE-TODO',
//     todolistId,
//     title
// }) as const


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

//
// export const addTodoTC = (title: string) => {
//     return (dispatch: any) => {
//         todosAPI.addTodo(title)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     console.log('res.data.data.item', res.data.data.item)
//                     dispatch(addTodoAC(res.data.data.item))
//                     console.log('+++')
//                 } else {
//                     alert('Errors:' + res.data.messages[0])
//                 }
//             })
//             .catch((e: AxiosError) => {
//                 alert(e.message)
//             })
//     }
// }
//
// export const removeTodoTC = (todolistId: string) => {
//     return (dispatch: any) => {
//         todosAPI.removeTodo(todolistId)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(removeTodoAC(todolistId))
//                 } else {
//                     alert('Errors:' + res.data.messages[0])
//                 }
//             })
//             .catch((e: AxiosError) => {
//                 alert(e.message)
//             })
//     }
// }
//
// export const updateTodoTC = (todolistId: string, title: string): AppThunkType => {
//     return (dispatch) => {
//         todosAPI.updateTodo(todolistId, title)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(updateTodoAC(todolistId, title))
//                 } else {
//                     alert('Errors:' + res.data.messages[0])
//                 }
//             })
//             .catch((e: AxiosError) => {
//                 alert(e.message)
//             })
//     }
// }
//
//
