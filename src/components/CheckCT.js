import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import CryptoBuy from './CryptoBuy'

function CheckCT(props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Grid item container>
			<Grid item>
				<Button
					onClick={() => {
						setIsOpen((prev) => !prev)
					}}
				>
					Buy {props.currency}
				</Button>
			</Grid>
			<Grid item key={props.index}>
				{isOpen ? <CryptoBuy id={props.id} currency={props.currency} /> : null}
			</Grid>
		</Grid>
	)
}

export default CheckCT
