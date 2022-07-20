import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	time: {},
}
export const timeSlice = createSlice({
	name: 'time',
	initialState,
	reducers: {
		setTime: (state, action) => {
			state.time = action.payload
		},
	},
})

export const { setTime } = timeSlice.actions
export default timeSlice.reducer
