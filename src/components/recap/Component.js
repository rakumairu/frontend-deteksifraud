import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Tabel from '../elements/tabel/Tabel'
import DatePick from '../elements/datepicker/DatePick'
import LineChartRC from '../elements/linechart/LineChartRC'
import SnackNotification from '../elements/snackbars/SnackNotification'

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
    <div className={ classes.root }>
      <SnackNotification
        message={ props.snackMessage }
        variant={ props.snackVariant }
      />
      <Grid
        container
        spacing={ 3 }
      >
        <Grid item xs={ 12 }>
          <DatePick
            value={ props.startDate }
            changeDate= { props.changeStartDate }
            id='start-date'
            label='Start Date'
            disableFuture={ false }
          />
          <DatePick
            value={ props.endDate }
            changeDate= { props.changeEndDate }
            id='end-date'
            label='End Date'
            disableFuture={ true }
          />
          <ButtonGroup 
            color="primary" 
            size='large' 
            aria-label="Outlined primary button group" 
            style={{
              float: 'right'
            }}
          >
            <Button onClick={ props.changeRange.bind(props, 'week') }>1 Week</Button>
            <Button onClick={ props.changeRange.bind(props, 'month') }>1 Month</Button>
            <Button onClick={ props.changeRange.bind(props, 'year') }>1 Year</Button>
            <Button onClick={ props.changeRange.bind(props, 'all') }>All</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Tabel
            data={ props.data }
            column={ props.column }
            isLoading={ props.isLoading }
            title={ 'Fraud Recap' }
          />
        </Grid>
        <Grid item xs={12}>
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