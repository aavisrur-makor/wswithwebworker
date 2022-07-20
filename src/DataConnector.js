import React, { useState } from 'react'
import webSockerWorker from './Globalworker'
import { useDispatch } from 'react-redux'
import { setPnlData } from './redux/slices/pnl-slice'
import { setIsWsLoaded } from './redux/slices/dataValidation'

function DataConnector() {
	const dispatch = useDispatch()
	const [state, setState] = useState(false)

	webSockerWorker.onmessage = (message) => {
		console.log('AVIV', message)
		console.log('LISTENING TO MESSAGES')
		if (message.data === 'Hello') {
			dispatch(setIsWsLoaded(message.data))
		}
		// if (message.data.type === 'pnl_monitor') {
		// 	return dispatch(setPnlData(message.data))
		// }
	}
}

export default DataConnector
