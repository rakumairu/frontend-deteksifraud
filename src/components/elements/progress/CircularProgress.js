// Import React
import React from 'react'

// Import material-ui components
import CircularProgress from '@material-ui/core/CircularProgress'

// Import styles
import useStyles from '../../app/Styles'


// Handle progress with circular progress
function CircularIndeterminate(props) {

  // Prepare styles
  const classes = useStyles()

  return (
    <span style={ {
      display: 'flex',
      alignSelf: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: '12%'
    } }>
      <CircularProgress
        className={classes.progress}
        size={40}
        status={'loading'}
        style={ {alignSelf: 'center'} }
      />
      <p style={ {alignSelf: 'center'} }>Loading...</p>
    </span>
  )
}

export default CircularIndeterminate