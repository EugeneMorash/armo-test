import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {AppActionType, appReducer} from "./app-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {UsersActionType, usersReducer} from "../components/users-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    users: usersReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


//* custom hook for TS
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// * types
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppActionsType =
    | AppActionType
    | UsersActionType

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


// @ts-ignore
window.store = store


// @ts-ignore
window.store = store;