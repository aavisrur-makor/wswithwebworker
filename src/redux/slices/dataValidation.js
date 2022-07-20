import { createSlice } from '@reduxjs/toolkit'

const dataValidationSlice = createSlice({
	name: 'validation',
	initialState: {
		isStreaming: false,
	},
	reducers: {
		setIsWsLoaded: (state, action) => {
			state.isWsLoaded = action.payload
		},
		setIsStreaming: (state, action) => {
			state.isStreaming = action.payload
		},
	},
})

export const { setIsWsLoaded, setIsStreaming } = dataValidationSlice.actions
export default dataValidationSlice.reducer
