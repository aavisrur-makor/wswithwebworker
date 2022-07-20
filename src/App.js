import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import { getWorker, initWorker } from './Globalworker'
import { SimpleBlotter } from './components/SimpleBlotter'
import MarketData from './components/MarketData'
import PnlMonitor from './components/PnlMonitor'
import IntraDay from './components/IntraDay'
import Clicktrading from './components/Clicktrading'
import { CircularProgress, Divider, Grid } from '@material-ui/core'
import CryptoBuy from './components/CryptoBuy'
import CheckCT from './components/CheckCT'
import { useDispatch, useSelector } from 'react-redux'
import { setPnlData } from './redux/slices/pnl-slice'
import worker from './Globalworker'
import DataConnector from './DataConnector'
const currencies = [
	{ name: 'BTC-USD', id: 'bf5d15d0-415f-11ec-b255-ad01e0712738' },
	{ name: 'BTC-EUR', id: 'bfa88422-1632-427b-bbc7-de104d7ffad5' },
]
function App() {
	const isLoaded = useSelector((state) => state.validation.isWsLoaded)
	const dispatch = useDispatch()
	useEffect(() => {
		worker.postMessage({ type: 'init' })
	}, [])

	return (
		<>
			{isLoaded ? (
				<Grid container direction='column' justifyContent='center'>
					{currencies.map((currency, index) => {
						return (
							<Grid item key={index}>
								<CheckCT index={index} id={currency.id} currency={currency.name} isWsLoaded={isLoaded} />
							</Grid>
						)
					})}

					<Divider style={{ padding: '20px', color: 'black' }}></Divider>
					<Grid item xs={12} container>
						<Grid item xs={4}>
							<IntraDay tableType='intraday_monitor' isWsLoaded={isLoaded} />
						</Grid>
						<Grid item xs={4}>
							<PnlMonitor tableType='pnl_monitor' isWsLoaded={isLoaded} />
						</Grid>

						<Grid item xs={4}>
							<IntraDay tableType='intraday_monitor' isWsLoaded={isLoaded} />
						</Grid>
						<Grid item xs={4}>
							<PnlMonitor tableType='pnl_monitor' isWsLoaded={isLoaded} />
							{/* <IntraDay isWsLoaded={isLoaded} /> */}
						</Grid>
						<Grid item xs={4}>
							<IntraDay tableType='intraday_monitor' isWsLoaded={isLoaded} />
						</Grid>
						<Grid item xs={4}>
							<PnlMonitor tableType='pnl_monitor' isWsLoaded={isLoaded} />
							{/* <IntraDay isWsLoaded={isLoaded} /> */}
						</Grid>
					</Grid>
				</Grid>
			) : (
				<CircularProgress />
			)}
			<DataConnector />
		</>
	)
}

export default App
