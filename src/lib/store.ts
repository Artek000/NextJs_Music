import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@/lib/userSlice'
import { trackSlice } from '@/lib/trackSlice'

export const makeStore = () => {
	return configureStore({
		reducer: {
			[userSlice.name]: userSlice.reducer,
			[trackSlice.name]: trackSlice.reducer
		}
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
