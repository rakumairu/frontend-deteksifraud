import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Tabel from '../elements/tabel/Tabel'
import Information from '../elements/information/Information'
import PieChart from '../elements/piechart/PieChart'
import SnackNotification from '../elements/snackbars/SnackNotification'
import LineChart from '../elements/linechart/LineChart'

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

const Component = props => {
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
        <Grid item xs={9} >
          <Tabel
            data={ props.data }
            column={ props.column }
            isLoading={ props.isLoading }
            title= { 'Fraud Streaming' }
          />
        </Grid>
        <Grid item xs={3} >
          <Information
            title='General Information'
            subtitle='General information about the data'
            content='this is the content of this card, please read it carefully'
            contentVariant='body2'
            isLoading={ props.isLoading }
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={3}>
          <PieChart
            isLoading={ props.isLoading }
            anomaly={ props.anomalyTotal }
            normal={ props.normalTotal }
            anomalyPercentage={ props.anomalyPercentage }
            normalPercentage={ props.normalPercentage }
          />
        </Grid>
        <Grid item xs={3}>
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
        <Grid item xs={6}>
          <LineChart
            isLoading={ props.isLoading }
            dataPoints={ props.data }
            title={ 'Fraud Line' }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Component