import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import TableComponent from '../tables/TableComponent'
import { getWorker } from '../Globalworker'
import { useDispatch } from 'react-redux'
import { setPnlData } from '../redux/slices/pnl-slice'
import worker from '../Globalworker'
export const SimpleBlotter = ({ openTable, tableName, tableType, columns, isWsLoaded }) => {
	const [dataFromWS, setDataFromWS] = useState(null)
	const dispatch = useDispatch()
	//send to ws
	useEffect(() => {
		if (openTable && isWsLoaded) {
			console.log('Sending event')
			worker.postMessage({
				type: 'send_event',
				message: { type: tableType, data: {} },
			})
		}
	}, [tableType, worker, openTable, isWsLoaded])

	//recieving from worker.
	useEffect(() => {
		const receiveBlotterData = (message) => {
			if (message.data && message.data.type === 'intraday_monitor' && message.data.content) {
				setDataFromWS(message.data.content.intraday_monitor_table)
			}
		}
		worker.onmessage = (message) => {
			receiveBlotterData(message)
		}
	}, [worker, tableType, openTable])
	return (
		<Grid container style={{ overflowX: 'auto' }}>
			<Grid style={{ maxHeight: '500px', width: '100%' }} item xs={12}>
				{openTable && <TableComponent loading={false} tableType={tableType} columns={columns} />}
			</Grid>
		</Grid>
	)
}
