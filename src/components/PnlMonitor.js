import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { SimpleBlotter } from './SimpleBlotter'

function PnlMonitor({ isWsLoaded, tableType }) {
	const [openTable, setOpenTable] = useState(false)
	const handleOpen = () => {
		setOpenTable((prev) => !prev)
	}
	const blotterProps = {
		previewMode: false,
		tableType,
		openTable: openTable,
		isWsLoaded,
		columns: [{ name: 'product' }, { name: 'daily' }, { name: 'mtd' }, { name: 'ytd' }],
	}

	return (
		<>
			{isWsLoaded && <Button onClick={handleOpen}>{`Open Pnl Monitor`}</Button>}
			<Grid item style={{ width: '100%' }}>
				<SimpleBlotter {...blotterProps} />
			</Grid>
		</>
	)
}

export default PnlMonitor
