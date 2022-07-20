import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTable, useSortBy } from 'react-table'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import EnigmaTableBodyRow from './BodyRow'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'

const EnigmaTable = ({ columns, type }) => {
	const data = useSelector((state) => state.pnlMonitor?.pnlData)
	const memoizedColumns = useMemo(
		() =>
			columns?.map((column) => {
				return {
					Header: column.name,
					accessor: column.name,
				}
			}),
		[columns]
	)
	const memoizedRows = useMemo(
		() =>
			data &&
			data.map((row) => {
				return {
					...row,
					name: row.product,
				}
			}),
		[data]
	)

	const shouldRender = (item) => {
		if (item?.Header === 'id') return false
		return true
	}

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns: memoizedColumns,
			data: memoizedRows,
		},
		useSortBy
	)

	return (
		<>
			{data ? (
				<Table stickyHeader {...getTableProps()}>
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow align={'center'} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) =>
									shouldRender(column) ? (
										<TableCell align={'center'} {...column.getHeaderProps(column.getSortByToggleProps())}>
											{column.render('Header')}
										</TableCell>
									) : null
								)}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row)
							return <EnigmaTableBodyRow row={row} type={type} {...row.getRowProps()} />
						})}
					</TableBody>
				</Table>
			) : (
				<CircularProgress />
			)}
		</>
	)
}

EnigmaTable.propTypes = {
	columns: PropTypes.array.isRequired,
}

export default EnigmaTable
