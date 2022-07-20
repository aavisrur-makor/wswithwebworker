import React, { useEffect, useState } from 'react'
import { Grid, useTheme, withStyles } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Chart from 'react-apexcharts'
import * as dayjs from 'dayjs'

import { useStyles, StyledChartToggleButtonGroup } from '../../styles/UiTickets'

import workerInstances from '../../services'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

const ExampleChart = ({ id, widgetData, isDayChart = true }) => {
	const theme = useTheme()
	const classes = useStyles()

	const [chartData, setChartData] = useState([])
	const [sortPeriod, setSortPeriod] = useState('1D')
	const [data, setData] = useState()
	const [tooltipColor, setTooltipColor] = useState('dark')

	useEffect(() => {
		if (theme.palette.loans.summaryTxt === '#B7BEBF') {
			setTooltipColor('light')
		} else if (theme.palette.loans.summaryTxt === '#9EA6B9') {
			setTooltipColor('dark')
		}
	}, [theme.palette.loans.summaryTxt])

	const settings = widgetData?.setting

	useEffect(() => {
		if (!workerInstances.WebSocketPricesInstance) return

		workerInstances.WebSocketPricesInstance.sendEvent({
			type: 'get_chart',
			data: {
				product_name: settings?.product?.name,
				period: sortPeriod,
			},
		})
	}, [workerInstances.WebSocketPricesInstance, sortPeriod])

	useEffect(() => {
		const getChartData = (message) => {
			if (message.data.type === 'get_chart' && !message.data.error) {
				setData(message.data.content)
			}
		}
		workerInstances.WebSocketPricesInstance.addEventListener('message', getChartData)
		return () => workerInstances.WebSocketPricesInstance.removeEventListener('message', getChartData)
	}, [workerInstances.WebSocketPricesInstance])

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
			<Grid container xs={12} className={classes.chartContainer}>
				<Grid className={classes.sortPeriodContainer}>
					<StyledChartToggleButtonGroup value={sortPeriod} onChange={filterByPeriod} exclusive orientation='horizontal' className={classes.sortedByPeriodButtonsContainer}>
						<ToggleButton value='1D' className={classes.sortedByButton}>
							1D
						</ToggleButton>
						<ToggleButton value='5D' className={classes.sortedByButton}>
							5D
						</ToggleButton>
						<ToggleButton value='1M' className={classes.sortedByButton}>
							1M
						</ToggleButton>
						<ToggleButton value='3M' className={classes.sortedByButton}>
							3M
						</ToggleButton>
						<ToggleButton value='6M' className={classes.sortedByButton}>
							6M
						</ToggleButton>
						<ToggleButton value='YTD' className={classes.sortedByButton}>
							YTD
						</ToggleButton>
					</StyledChartToggleButtonGroup>
				</Grid>
				<Chart className={classes.innerChart} options={options} series={series} type='candlestick' />
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
		color: theme.palette.text.main,
		backgroundColor: theme.palette.table.main,
		'&.Mui-selected': {
			color: '#2E81EC',
			backgroundColor: theme.palette.table.main,
			border: '1px solid #2E81EC',
		},
	},
}))(ToggleButtonGroup)
