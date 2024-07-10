import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/lib/store'
import { ResponseTracksList } from '@/lib/types'

interface trackState extends ResponseTracksList {}

const initialState: trackState = {
	id: 0,
	artist_name: '',
	track_name: '',
	img_url: ''
}

export const trackSlice = createSlice({
	name: 'track',
	initialState,
	reducers: {
		setTrack: (state, action: PayloadAction<trackState>) => {
			state.id = action.payload.id
			state.artist_name = action.payload.artist_name
			state.track_name = action.payload.track_name
			state.img_url = action.payload.img_url
		}
	}
})

export const { setTrack } = trackSlice.actions
export const selectTrack = (state: RootState) => state.track
export default trackSlice.reducer
