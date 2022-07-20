import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getWorker } from '../Globalworker'
import { receiveBlotterData } from '../helperFunctions'

function Clicktrading({ type, currency, isAbleToRender, id }) {
	const CTPrices = useSelector((state) => state.clickTrading.clickTrading[id])
	return (
		<>
			{CTPrices ? (
				<Grid container>
					<Paper style={{ border: '1px solid black', width: '400px' }}>
						<Grid item container xs={12}>
							<Typography>{`Currency : ${currency}`}</Typography>
						</Grid>
						<Grid item container xs={12}>
							<Grid item xs={6}>
								<Typography>Bid</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography>{CTPrices[currency].price.bid ? CTPrices[currency].price.bid.price : 'No data to show'}</Typography>
							</Grid>
						</Grid>
						<Grid item container xs={12}>
							<Grid item xs={6}>
								<Typography>Ask</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography>{CTPrices[currency].price.ask ? CTPrices[currency].price.ask.price : 'No data to show'}</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			) : (
				<CircularProgress />
			)}
		</>
	)
}

export default Clicktrading
