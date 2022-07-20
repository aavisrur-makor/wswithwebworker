import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Chart from './Chart'

function ChartComponent(props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Grid item container>
			<Grid item>
				<Button
					onClick={() => {
						setIsOpen((prev) => !prev)
					}}
				>
					{`${props.currency} Chart`}
				</Button>
			</Grid>
			<Grid item key={props.index}>
				{isOpen ? <Chart id={props.id} currency={props.currency} /> : null}
			</Grid>
		</Grid>
	)
}

export default ChartComponent
