import React, { useEffect, useState, useRef } from 'react'
import DataChart from './SharedComponents/DataChart'
import DataTable from './SharedComponents/DataTable'
import worker from '../Globalworker'
import { Grid, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'

function Snapshot(props) {
  const dataFromWS = useSelector((state) => state.snapshot.snapshotData)
  console.log({ dataFromWS })
  const [isSnapshotActive, setIsSnapshotActive] = useState(false)

  useEffect(() => {
    if (isSnapshotActive) {
      let requestType = 'trading_activity'
      // let requestType = 'trading_activity'
      let requestData = {
        period: 'daily',
        // date, // removed for now
        display: 'net', // 'net' / 'gross'
        data: 'volume', // 'pnl' / 'volume' / 'trades'
        avg: true,
        variation: true,
        type: 'snapshot', // 'snapshot' / 'ott'
        trading_activity_by: 'product',
        format: 'usd',
      }
      console.log('hereeee')
      worker.postMessage({
        type: 'send_event',
        message: {
          id: props.id,
          type: requestType,
          data: requestData,
        },
      })
    }
  }, [props.id, isSnapshotActive])

  const generalProps = {
    _data: dataFromWS?.content,
    palette: 'orange',
    identifier: 'snapshot',
    info: 'volume',
    format: 'usd',
  }

  const tableProps = {
    columnsHeader: [
      { Header: 'Total', shouldRender: true },
      { Header: 'Average', shouldRender: true },
      { Header: 'Variation', shouldRender: true },
    ],
    avg: true,
    variation: true,
    isATH: true,
  }

  const renderTable = () => <DataTable {...generalProps} {...tableProps} />

  const renderPie = () => (
    <Grid container style={{ height: '100%' }}>
      <DataChart {...generalProps} />
    </Grid>
  )

  return (
    <React.Fragment>
      <Button onClick={() => setIsSnapshotActive((prev) => !prev)}>Activate snapshot</Button>
      {dataFromWS && isSnapshotActive && (
        <React.Fragment>
          {dataFromWS?.content && (
            <Grid item xs={12} style={{ height: 'calc(100% - 20px)' }}>
              <Grid container style={{ height: '100%' }}>
                <Grid
                  item
                  xs={7}
                  style={{
                    height: 'calc(100% + 19px)',
                    borderRight: `1px solid grey`,
                  }}
                >
                  {renderTable()}
                </Grid>

                <Grid item id='chart' xs style={{ height: '100%' }}>
                  {renderPie()}
                </Grid>
              </Grid>
            </Grid>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Snapshot
