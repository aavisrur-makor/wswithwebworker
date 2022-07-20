import { combineReducers } from '@reduxjs/toolkit'
import pnlReducer from './slices/pnl-slice'
import ValidationReducer from './slices/dataValidation'
const createRootReducer = () =>
	combineReducers({
		pnlMonitor: pnlReducer,
		validation: ValidationReducer,
	})

export default createRootReducer
