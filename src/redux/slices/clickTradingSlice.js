import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	clickTrading: {},
}
export const clickTradingSlice = createSlice({
	name: 'click_trading',
	initialState,
	reducers: {
		setClickTradingField: (state, action) => {
			const { field, data } = action.payload
			state.clickTrading[field] = data
		},
	},
})

export const { setClickTradingField } = clickTradingSlice.actions
export default clickTradingSlice.reducer
