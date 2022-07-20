import React, { useEffect, useRef, useState } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getYear } from 'date-fns'

function CustomLegends(props) {
  const { data, colorPalette, limit, type } = props
  const paperRef = useRef()
  const typRef = useRef()
  const [dataLocal, setDataLocal] = useState(null)
  const currentYear = getYear(2022)

  const minWidth = () => {
    let min = paperRef?.current?.offsetWidth + typRef?.current?.offsetWidth + 10 ?? 0
    return min
  }

  useEffect(() => {
    if (data) {
      switch (type) {
        case 'categories':
        case 'coins':
        case 'clients':
          return setDataLocal(editData(data))
        case 'widget':
          return setDataLocal(data)
        case 'type':
          return setDataLocal(editTypeData(data))

        default:
          return setDataLocal(data)
      }
    }
  }, [type, data])

  const editData = () => {
    let bigObj = {}
    data.forEach((element) => {
      let obj = {}
      obj[element.name] = { amount: element.years[currentYear].amount }
      bigObj = { ...bigObj, ...obj }
    })
    return bigObj
  }

  const editTypeData = () => {
    let bigObj = {}
    Object.entries(data).forEach(([key, value]) => {
      key !== 'OTC' &&
        Object.entries(value).forEach(([k, v]) => {
          let obj = {}
          obj[k] = { amount: v[currentYear].direct.amount }
          bigObj = { ...bigObj, ...obj }
        })
    })
    return bigObj
  }

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str
  }

  function returnNameValue(str, n) {
    return truncate(str, n)
  }

  return (
    <Grid container style={{ height: '92%', overflow: 'auto', alignContent: 'baseline', padding: '10px 0px 5px' }}>
      {dataLocal &&
        Object.keys(dataLocal).map((v, i) => (
          <Grid item key={i} xs={6} style={{ minWidth: Number(limit) < 20 ? minWidth() - 3 : minWidth() + 25, marginInline: 5 }}>
            <Grid container style={{ flexWrap: 'nowrap' }}>
              <Grid item ref={paperRef}>
                <Grid container>
                  <Grid item>
                    <Paper style={{ backgroundColor: 'red' }} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item ref={typRef}>
                {v.length > 6 ? <Typography>{Object.keys(data)[0] === 'undefined' ? 'Total' : returnNameValue(v, 8)}</Typography> : <Typography>{returnNameValue(v, 8)}</Typography>}
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  )
}

export default CustomLegends
