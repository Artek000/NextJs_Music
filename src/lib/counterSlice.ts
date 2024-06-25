import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: null
    },
    reducers: {
        setJwt: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setJwt } = counterSlice.actions

export default counterSlice.reducer