import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "@/lib/store";

interface userState {
    id?: number
    isLoggedIn: boolean,
    login: string,
    token: string,
}

const initialState: userState = {
    isLoggedIn: false,
    login: '',
    token: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) =>{
            state.login = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const { setLogin, setToken } = userSlice.actions
export const selectLogin = (state: RootState) => state.user.login
export default userSlice.reducer