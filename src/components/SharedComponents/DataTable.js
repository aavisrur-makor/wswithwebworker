import { Grid, Table, TableHead, TableCell, TableBody, TableContainer, TableRow, Typography } from '@material-ui/core'
import CallReceivedIcon from '@material-ui/icons/CallReceived'
import CallMadeIcon from '@material-ui/icons/CallMade'

function DataTable(props) {
  const { _data, identifier, avg, format, variation, isATH, columnsHeader } = props

  const renderColumn = (value, column) => {
    if (value !== undefined) {
      switch (column) {
        case 'avg':
          return renderAmount(value)

        case 'variation':
          return renderVariation(value)

        default:
          break
      }
    }
  }

  // main amount (always rendered) or avg
  const renderAmount = (value) => {
    return format === 'usd' ? `$ ${value}` : `${value} %`
  }

  const renderVariation = (value) => {
    console.log('valueeeee', value)
    return (
      <Grid container alignItems='center' justifyContent='flex-end' style={{ minWidth: '60px' }}>
        <Grid item>
          {value < 100 && <CallReceivedIcon />}
          {value > 100 && <CallMadeIcon />}
          {value === 0 && <div></div>}
        </Grid>
        <Grid item>{2}%</Grid>
      </Grid>
    )
  }

  return (
    _data && (
      <TableContainer style={{ height: '100%', overflow: 'auto' }}>
        <Table stickyHeader size={'small'} aria-label='data-table'>
          {(identifier === 'ranking' || 'snapshot') && (
            <TableHead>
              <TableRow align={'center'}>
                {identifier === 'ranking' && <TableCell></TableCell>}
                {columnsHeader?.map((column, index) => (column.shouldRender ? <TableCell align={index === 0 ? 'center' : 'center'}>{column['Header']}</TableCell> : null))}
              </TableRow>
            </TableHead>
          )}

          <TableBody>
            {Object.keys(_data)?.length &&
              Object.keys(_data).map((item, idx) => (
                <TableRow tabIndex={-1} key={item}>
                  {identifier === 'ranking' && (
                    <TableCell id={idx} align='center' style={{ paddingLeft: '10px' }}>
                      {`${idx + 1}.`}
                    </TableCell>
                  )}

                  <TableCell id={item} align='left' style={{ paddingLeft: identifier === 'snapshot' ? '20px' : '5px' }}>
                    {item.length > 15 ? <Typography variant='h1'>{item}</Typography> : Object.keys(_data)[0] === 'undefined' ? 'Total' : item}
                  </TableCell>

                  <TableCell id='amount' align='right'>
                    {renderAmount(_data[item].amount)}
                  </TableCell>
                  {avg && (
                    <TableCell id='avg' align='right'>
                      {renderColumn(_data[item]?.avg, 'avg')}
                    </TableCell>
                  )}
                  {variation && <TableCell id='total'>{renderColumn(_data[item]?.variation, 'variation')}</TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  )
}

export default DataTable
