import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/lib/store'

interface userState {
	id?: number
	isLoggedIn: boolean
	login: string
	token: string
}

const initialState: userState = {
	isLoggedIn: false,
	login: '',
	token: ''
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<string>) => {
			state.login = action.payload
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload
		},
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload
		}
	}
})

export const { setLogin, setToken, setIsLoggedIn } = userSlice.actions
export const selectLogin = (state: RootState) => state.user.login
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn
export default userSlice.reducer
