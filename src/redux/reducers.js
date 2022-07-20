import { combineReducers } from '@reduxjs/toolkit'
import pnlReducer from './slices/pnl-slice'
import ValidationReducer from './slices/dataValidation'
import intradayReducer from './slices/intraday_monitor'
import clickTradingReducer from './slices/clickTradingSlice'
import chartReducer from './slices/chartSlice'
import timeReducer from './slices/timeSlice'
import snapshotReducer from './slices/snapshotSlice'
const createRootReducer = () =>
	combineReducers({
		pnlMonitor: pnlReducer,
		validation: ValidationReducer,
		intraDayMonitor: intradayReducer,
		clickTrading: clickTradingReducer,
		chart: chartReducer,
		time: timeReducer,
		snapshot: snapshotReducer,
	})

export default createRootReducer
