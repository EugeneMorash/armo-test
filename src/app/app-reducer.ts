const initialState = {
    isLoading: false
}

export type AppStateType = typeof initialState
export type AppActionType =
    | SetLoadingAT


export type SetLoadingAT = ReturnType<typeof setLoadingAC>

export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case "APP/SET-LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state
    }
}


export const setLoadingAC = (isLoading: boolean) => ({
    type: 'APP/SET-LOADING',
    isLoading
}) as const
