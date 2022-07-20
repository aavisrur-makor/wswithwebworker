import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	pnlData: [],
}
export const pnlSlice = createSlice({
	name: 'pnl_monitor',
	initialState,
	reducers: {
		setPnlData: (state, action) => {
			state.pnlData = action.payload
		},
	},
})

export const { setPnlData } = pnlSlice.actions
export default pnlSlice.reducer
