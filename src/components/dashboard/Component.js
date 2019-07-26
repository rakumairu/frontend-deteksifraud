// Import React and styles
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

// Import material-ui components
import Grid from '@material-ui/core/Grid';
import Tabel from '../elements/tabel/Tabel'
import Information from '../elements/information/Information'
import SnackNotification from '../elements/snackbars/SnackNotification'
import LineChartRC from '../elements/linechart/LineChartRC'


// Serve as view for dashboard.js
const Component = props => {

  // Prepare the styles that will be used
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SnackNotification
        message={ props.snackMessage }
        variant={ props.snackVariant }
      />
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={6} >
          <Tabel
            data={ props.data }
            column={ props.column }
            isLoading={ props.isLoading }
            title= { 'Fraud Streaming' }
          />
        </Grid>
        <Grid item xs={3} >
          <Information
            title='Fraud Transaction'
            subtitle='The amount of transaction that marked as fraud'
            content={ props.anomalyTotal }
            contentVariant='h2'
            isLoading={ props.isLoading }
          />
          <Information
            title='Fraud Transaction'
            subtitle='The amount of transaction that marked as fraud compared to all the data'
            content={ props.anomalyPercentage + '%' }
            contentVariant='h2'
            isLoading={ props.isLoading }
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={9}>
          <LineChartRC
            data={ props.data }
            isLoading={ props.isLoading }
            title={ 'Fraud Line Chart' }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Component