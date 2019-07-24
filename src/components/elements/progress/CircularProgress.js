// Import React
import React from 'react'

// Import material-ui components
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


// Handle progress with circular progress
function CircularIndeterminate(props) {

  // Handle styling
  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      textAlign: 'center'
    },
  }))

  const classes = useStyles()

  return (
    <Paper>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: props.minHeight }}
      >
        <Grid item xs={3}>
          <CircularProgress
            className={classes.progress}
            size={40}
            left={-20}
            top={10}
            status={'loading'}
            style={{marginLeft: '20%'}}
          />
          <p>Loading...</p>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CircularIndeterminate