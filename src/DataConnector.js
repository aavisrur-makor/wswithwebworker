import React, { useState } from 'react'
import webSockerWorker from './Globalworker'
import { useDispatch } from 'react-redux'
import { setPnlData } from './redux/slices/pnl-slice'
import { setIsWsLoaded } from './redux/slices/dataValidation'
import { setIntraDayData } from './redux/slices/intraday_monitor'
import { setClickTradingField } from './redux/slices/clickTradingSlice'

function DataConnector() {
	const dispatch = useDispatch()
	const [state, setState] = useState(false)

	webSockerWorker.onmessage = (message) => {
		console.log('AVIVsss', message)
		console.log('LISTENING TO MESSAGES')
		if (message.data.type === 'init') {
			dispatch(setIsWsLoaded(message.data))
		}
		if (message.data.type === 'pnl_monitor') {
			dispatch(setPnlData(message.data.data.content))
		}
		if (message.data.type === 'intraday_monitor') {
			// console.log('intraday dataaaaa', message.data)
			dispatch(setIntraDayData(message.data.data.content.intraday_monitor_table))
		}
		if (message.data.type === 'subscription') {
			dispatch(setClickTradingField({ field: message.data.data.id, data: message.data.data.content }))
		}
	}
}

export default DataConnector
