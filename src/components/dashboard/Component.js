// Import React and styles
import React from 'react'

// Import material-ui components
import Grid from '@material-ui/core/Grid';
import Tabel from '../elements/tabel/Tabel'

// Import components
import Information from '../elements/information/Information'
import SnackNotification from '../elements/snackbars/SnackNotification'
import LineChartRC from '../elements/linechart/LineChartRC'
import CircularIndeterminate from '../elements/progress/CircularProgress'


// Dumb component for dashboard.js
const Component = props => {

  let content = (
    props.isLoading ?
    <CircularIndeterminate minHeight={'416px'} /> :
    <>
      <Grid item xs={9} >
        <Tabel
          data={ props.data }
          isLoading={ props.isLoading }
          title= { 'Fraud Streaming' }
        />
      </Grid>
      <Grid item xs={3} >
        <Information
          content={ [
            {
              title: 'Detected Fraud Transactions',
              data: props.anomalyTotal
            },
            {
              title: 'Percentage',
              data: props.anomalyPercentage + '%'
            },
            {
              title: 'Total Transactions',
              data: props.totalData
            }
          ] }
          tooltip={ 'General Information of Fraud Transaction' }
          isLoading={ props.isLoading }
        />
      </Grid>
      <Grid item xs={12}>
        <LineChartRC
          data={ props.data }
          isLoading={ props.isLoading }
          title={ 'Fraud Line Chart' }
        />
      </Grid>
    </>
  )

  return (
    <div>
      <SnackNotification
        message={ props.snackMessage }
        variant={ props.snackVariant }
      />
      <Grid
        container
        spacing={3}
      >
        { content }
      </Grid>
    </div>
  )
}

export default Component