import React, { useEffect, useState } from 'react'
import { Grid, useTheme, withStyles } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Chart from 'react-apexcharts'
import * as dayjs from 'dayjs'
import { ToggleButtonGroup } from '@mui/material'
import worker from '../Globalworker'
import { useSelector } from 'react-redux'
const ExampleChart = ({ currency }) => {
	const theme = useTheme()

	const [chartData, setChartData] = useState([])
	const [sortPeriod, setSortPeriod] = useState('1D')
	const [tooltipColor, setTooltipColor] = useState('dark')
	const data = useSelector((state) => state.chart?.chartData)

	useEffect(() => {
		worker.postMessage({
			type: 'send_event',
			message: {
				type: 'get_chart',
				data: {
					product_name: currency,
					period: sortPeriod,
				},
			},
		})
	}, [worker, sortPeriod])
	const series = [
		{
			name: 'candle',
			data: chartData,
		},
	]

	const options = {
		chart: {
			width: '100%',
			height: '80%',
			zoom: {
				enabled: true,
				type: 'x',
				autoScaleYaxis: false,
				autoScaleXaxis: true,

				zoomedArea: {
					fill: {
						color: '#90CAF9',
						opacity: 0.4,
					},
					stroke: {
						color: '#0D47A1',
						opacity: 0.4,
						width: 1,
					},
				},
			},
			type: 'candlestick',
			animations: { enabled: false },
		},
		tooltip: {
			enabled: true,
			theme: tooltipColor,
		},
		plotOptions: {
			candlestick: {
				wick: { useFillColor: true },
			},
		},
		xaxis: {
			type: 'datetime',

			labels: {
				formatter: (val) => {
					return dayjs(val).format('MMM DD HH:mm')
				},
			},
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	}

	useEffect(() => {
		const array = []

		data &&
			data?.map((item) => {
				let date = new Date(item.time_period_start)
				const cel = {
					x: date,
					y: [item.price_open, item.price_high, item.price_low, item.price_close],
				}

				return array.push(cel)
			})

		setChartData(array)
	}, [data])

	const filterByPeriod = (_, newValue) => {
		setSortPeriod(newValue)
	}

	return (
		chartData && (
			<Grid container>
				<Grid>
					<StyledChartToggleButtonGroup value={sortPeriod} onChange={filterByPeriod} exclusive orientation='horizontal'>
						<ToggleButton value='1D'>1D</ToggleButton>
						<ToggleButton value='5D'>5D</ToggleButton>
						<ToggleButton value='1M'>1M</ToggleButton>
						<ToggleButton value='3M'>3M</ToggleButton>
						<ToggleButton value='6M'>6M</ToggleButton>
						<ToggleButton value='YTD'>YTD</ToggleButton>
					</StyledChartToggleButtonGroup>
				</Grid>
				<Chart style={{ width: '100%' }} options={options} series={series} type='candlestick' />
			</Grid>
		)
	)
}

export default React.memo(ExampleChart)

export const StyledChartToggleButtonGroup = withStyles((theme) => ({
	grouped: {
		padding: 8,
		'&:not(:last-child)': {
			marginRight: '5px',
		},
		height: '26px',
		color: '#000000',
		backgroundColor: '#ffffff',
		'&.Mui-selected': {
			color: '#2E81EC',
			backgroundColor: '#ffffff',
			border: '1px solid #2E81EC',
		},
	},
}))(ToggleButtonGroup)
