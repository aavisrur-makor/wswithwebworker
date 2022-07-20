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
import Chart from './components/Chart'
import ChartComponent from './components/ChartComponent'
import GlobalTime from './components/GlobalTime'
const currencies = [
	{ name: 'BTC-EUR', id: 'bf5d15d0-415f-11ec-b255-ad01e0712738' },
	{ name: 'BTC-USD', id: 'bfa88422-1632-427b-bbc7-de104d7ffad5' },
]
const charts = [{ name: 'BTC-EUR' }, { name: 'BTC-USD' }]
function App() {
	const isLoaded = useSelector((state) => state.validation.isWsLoaded)
	const isTimeStreaming = useSelector((state) => state.validation.isStreaming['time'] && state.validation.isStreaming['time'])
	useEffect(() => {
		if (!isLoaded) worker.postMessage({ type: 'init' })
	}, [isLoaded])

	return (
		<>
			{isLoaded ? (
				<Grid container direction='column' justifyContent='center'>
					{isTimeStreaming && (
						<Grid item>
							<GlobalTime isTimeStreaming={isTimeStreaming} />
						</Grid>
					)}
					{currencies.map((currency, index) => {
						return (
							<Grid item key={index}>
								<CheckCT index={index} id={currency.id} currency={currency.name} isWsLoaded={isLoaded} />
							</Grid>
						)
					})}

					<Divider style={{ padding: '20px', color: 'black' }}></Divider>
					<Grid item xs={12} container>
						<Grid item xs={12}>
							<IntraDay tableType='intraday_monitor' isWsLoaded={isLoaded} />
						</Grid>
						<Grid item xs={12}>
							<PnlMonitor tableType='pnl_monitor' isWsLoaded={isLoaded} />
						</Grid>

						<Grid item xs={12}>
							<IntraDay tableType='intraday_monitor' isWsLoaded={isLoaded} />
						</Grid>
						<Grid item xs={12}>
							<PnlMonitor tableType='pnl_monitor' isWsLoaded={isLoaded} />
							{/* <IntraDay isWsLoaded={isLoaded} /> */}
						</Grid>
						<Grid item xs={12}>
							<IntraDay tableType='intraday_monitor' isWsLoaded={isLoaded} />
						</Grid>
						<Grid item xs={12}>
							<PnlMonitor tableType='pnl_monitor' isWsLoaded={isLoaded} />
							{/* <IntraDay isWsLoaded={isLoaded} /> */}
						</Grid>
					</Grid>
					<Divider style={{ padding: '20px', color: 'black' }}></Divider>
					{charts.map((currency) => {
						return <ChartComponent currency={currency.name} />
					})}
					{/* <ChartComponent /> */}
				</Grid>
			) : (
				<CircularProgress />
			)}
			<DataConnector />
		</>
	)
}

export default App
