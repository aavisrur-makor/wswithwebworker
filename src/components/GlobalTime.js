import { useEffect, memo } from 'react'
import { Grid, Typography, Avatar, Menu, Tab, Tabs, ButtonBase, Divider, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { parseISO, format } from 'date-fns'
import worker from '../Globalworker'
const GlobalTime = ({ isTimeStreaming }) => {
	const time = useSelector((state) => state.time.time)

	useEffect(() => {
		if (isTimeStreaming)
			worker.postMessage({
				type: 'send_event',
				message: {
					data: {},
					id: '947ac8fe-5374-4bed-8baf-f5833f77d8a8',
					type: 'time',
				},
			})
	}, [isTimeStreaming])
	return (
		<>
			{time.timestamp && isTimeStreaming && (
				<Grid container style={{ width: 'fit-content', height: 60, paddingRight: 10, flexWrap: 'nowrap' }} justifyContent='flex-end'>
					<Grid item style={{ borderRight: '2px solid #000000', paddingRight: '24px' }}>
						<Grid container direction='column' justifyContent='flex-end' style={{ height: '95%' }}>
							<Grid item>
								<Typography variant='h3' style={{ color: '#000000', fontWeight: 500, marginBlock: '2' }}>
									{time && `${format(parseISO(time?.timestamp), 'hh:mm:ss a')} UTC +0`}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='h3' style={{ color: '#000000', fontWeight: 500, marginBlock: '2' }}>
									{time && format(parseISO(time?.timestamp), 'EEE, dd MMMM yyyy')}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
		</>
	)
}

export default memo(GlobalTime)
