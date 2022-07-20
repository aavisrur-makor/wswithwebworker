import { createSlice } from '@reduxjs/toolkit'

const dataValidationSlice = createSlice({
	name: 'validation',
	initialState: {
		isWsLoaded: false,
		isStreaming: {},
	},
	reducers: {
		setIsWsLoaded: (state, action) => {
			state.isWsLoaded = action.payload
		},
		setIsStreaming: (state, action) => {
			const { field, data } = action.payload
			state.isStreaming[field] = data
		},
	},
})

export const { setIsWsLoaded, setIsStreaming } = dataValidationSlice.actions
export default dataValidationSlice.reducer
