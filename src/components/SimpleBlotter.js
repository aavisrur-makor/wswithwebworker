import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import TableComponent from '../tables/TableComponent'
import { getWorker } from '../Globalworker'
import { useDispatch } from 'react-redux'
import { setPnlData } from '../redux/slices/pnl-slice'
import worker from '../Globalworker'
export const SimpleBlotter = ({ openTable, tableName, tableType, columns, isWsLoaded }) => {
	const dispatch = useDispatch()
	//send to ws
	useEffect(() => {
		if (openTable && isWsLoaded) {
			worker.postMessage({
				type: 'send_event',
				message: { type: tableType, data: {} },
			})
		}
	}, [tableType, worker, openTable, isWsLoaded])

	//recieving from worker.

	return (
		<Grid container style={{ overflowX: 'auto' }}>
			<Grid style={{ maxHeight: '500px', width: '100%' }} item xs={12}>
				{openTable && <TableComponent loading={false} tableType={tableType} columns={columns} />}
			</Grid>
		</Grid>
	)
}
