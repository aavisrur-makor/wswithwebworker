import { combineReducers } from '@reduxjs/toolkit'
import pnlReducer from './slices/pnl-slice'
import ValidationReducer from './slices/dataValidation'
import intradayReducer from './slices/intraday_monitor'
import clickTradingReducer from './slices/clickTradingSlice'
const createRootReducer = () =>
	combineReducers({
		pnlMonitor: pnlReducer,
		validation: ValidationReducer,
		intraDayMonitor: intradayReducer,
		clickTrading: clickTradingReducer,
	})

export default createRootReducer
