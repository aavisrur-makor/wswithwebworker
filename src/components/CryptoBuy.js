import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getWorker } from '../Globalworker'
import { receiveBlotterData } from '../helperFunctions'
import Clicktrading from './Clicktrading'
import worker from '../Globalworker'
function CryptoBuy({ currency, id, isOpen }) {
	useEffect(() => {
		worker.postMessage({
			field: currency,
			type: 'send_event',
			message: {
				type: 'subscription',
				id: id,
				data: {
					products: [currency],
					quantity: '3.00000000',
					level: true,
					high: true,
					low: true,
					change_daily: true,
				},
			},
		})
	}, [])

	return (
		<Grid container item>
			<Clicktrading id={id} currency={currency} />
		</Grid>
	)
}

export default CryptoBuy
