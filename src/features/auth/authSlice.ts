import { createSlice } from "@reduxjs/toolkit"


interface IState {
    token: string | null
}

const initialState = {
    token: null
} as IState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log("action", action.payload);
            const { access: accessToken, refresh } = action.payload.data
            if (refresh) {
                localStorage.setItem("refresh", refresh)
            }
            state.token = accessToken
        },
        logOut: (state) => {
            console.log("logout");
            localStorage.removeItem("refresh")
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: any) => state.auth.user
export const selectCurrentToken = (state: any) => state.auth.token
