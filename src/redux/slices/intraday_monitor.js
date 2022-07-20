import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	intraDayData: [],
}
export const intraDaySlice = createSlice({
	name: 'intraday_monitor',
	initialState,
	reducers: {
		setIntraDayData: (state, action) => {
			state.intraDayData = action.payload
		},
	},
})

export const { setIntraDayData } = intraDaySlice.actions
export default intraDaySlice.reducer
