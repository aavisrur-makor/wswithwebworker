import { createSlice } from '@reduxjs/toolkit'

const dataValidationSlice = createSlice({
	name: 'validation',
	initialState: {
		isWsLoaded: false,
	},
	reducers: {
		setIsWsLoaded: (state, action) => {
			state.isWsLoaded = action.payload
		},
	},
})

export const { setIsWsLoaded } = dataValidationSlice.actions
export default dataValidationSlice.reducer
