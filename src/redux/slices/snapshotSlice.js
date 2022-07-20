import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snapshotData: [],
}
export const snapshotSlice = createSlice({
  name: 'trading_activity',
  initialState,
  reducers: {
    setSnapshotData: (state, action) => {
      state.snapshotData = action.payload
    },
  },
})

export const { setSnapshotData } = snapshotSlice.actions
export default snapshotSlice.reducer
