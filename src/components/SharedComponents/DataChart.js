import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { Pie } from 'react-chartjs-2'
import CustomLegends from './CustomLegends'

function DataChart(props) {
  const { _data, limit, format, identifier } = props
  const [chartDataLocal, setChartDataLocal] = useState([])
  const colorPalette = 'orange'

  useEffect(() => {
    if (_data) {
      let generatedPieData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: colorPalette,
            hoverOffset: 2,
            borderWidth: 0.5,
            spacing: 0,
            borderAlign: 'inner',
          },
        ],
      }

      Object.keys(_data).forEach((item, idx) => {
        generatedPieData.datasets[0].data.push(_data[item].amount ? _data[item].amount : _data[item].net) && generatedPieData.labels.push(item)
      })

      setChartDataLocal(generatedPieData)
    }
    return () => {
      setChartDataLocal(null)
    }
  }, [_data])

  const generateTooltipText = (context) => {
    return format === 'usd' ? `$ ${context.formattedValue}` : `${context.formattedValue} %`
  }

  return (
    <Grid container justifyContent='center' style={{ height: '100%' }}>
      <Grid item xs={6} style={{ marginTop: '-6px' }}>
        <Grid container style={{ maxWidth: Number(limit) >= 34 ? '190px' : '216px' }} justifyContent='flex-end'>
          <Grid item xs={12} style={{ marginRight: Number(limit) >= 35 ? `-5px` : 0 }}>
            <Pie
              data={chartDataLocal}
              options={{
                layout: {
                  padding: {
                    top: identifier === 'ranking' && 5,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  },
                },
                radius: '90%',
                aspectRatio: 1,
                plugins: {
                  legend: {
                    display: false, // make display true
                  },
                  tooltip: {
                    enabled: true,
                    backgroundColor: 'rgb(255 255 255 / 70%)',
                    opacity: 0.5,
                    titleColor: '#333333',
                    titleFont: { weight: 200 },
                    titleAlign: 'center',
                    bodyColor: '#000000',
                    borderColor: '#dddddd',
                    borderWidth: 1,
                    cornerRadius: 3,
                    callbacks: {
                      beforeTitle: function (context) {
                        let label = context[0].label || ''
                        return label
                      },

                      label: (context) => generateTooltipText(context),
                    },
                  },
                },
                // borderColor: theme.palette.primary.main,
                // color: theme.palette.text.main,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ height: '100%' }}>
        <CustomLegends data={_data} colorPalette={colorPalette} limit={limit} type={'widget'} />
      </Grid>
    </Grid>
  )
}

export default DataChart
