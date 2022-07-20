import React, { useState } from 'react'
import webSockerWorker from './Globalworker'
import { useDispatch } from 'react-redux'
import { setPnlData } from './redux/slices/pnl-slice'
import { setIsStreaming, setIsWsLoaded } from './redux/slices/dataValidation'
import { setIntraDayData } from './redux/slices/intraday_monitor'
import { setClickTradingField } from './redux/slices/clickTradingSlice'
import { setChartData } from './redux/slices/chartSlice'
import { setTime } from './redux/slices/timeSlice'
import { setSnapshotData } from './redux/slices/snapshotSlice'

function DataConnector() {
	const dispatch = useDispatch()
	const [state, setState] = useState(false)

	webSockerWorker.onmessage = (message) => {
		if (message.data.type === 'ws_status') {
			dispatch(setIsWsLoaded(message.data))
		}
		if (message.data.type === 'isStreming') {
			dispatch(setIsStreaming({ field: message.data.table, data: message.data }))
		}
		if (message.data.type === 'pnl_monitor') {
			dispatch(setPnlData(message.data.content))
		}
		if (message.data.type === 'intraday_monitor') {
			dispatch(setIntraDayData(message.data.content.intraday_monitor_table))
		}
		if (message.data.type === 'subscription') {
			dispatch(setClickTradingField({ field: message.data.id, data: message.data.content }))
		}
		if (message.data.type === 'get_chart') {
			dispatch(setChartData(message.data.content))
		}
		if (message.data.type === 'time') {
			dispatch(setTime(message.data.content))
		}
		if (message.data.type === 'trading_activity') {
			dispatch(setSnapshotData(message.data))
		}
	}
}

export default DataConnector
