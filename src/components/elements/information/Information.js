// Import React
import React, { Component } from 'react'

// Import material-ui components
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

// Import component
import CircularIndeterminate from '../progress/CircularProgress'


// Information component, displaying come information
const Information = props => {

  // Handle styles
  const useStyles = makeStyles(theme => ({
    card: {
      minWidth: 275,
      height: 'inherit'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }))

  const classes = useStyles()

  return (
    <div>
      { props.isLoading ?
        <CircularIndeterminate minHeight={'416px'} /> :
        <Tooltip title={props.subtitle}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                { props.title }
              </Typography>
              <Typography variant={props.contentVariant} component="p">
                { props.content }
              </Typography>
            </CardContent>
          </Card>
        </Tooltip>
      }
    </div>
  )
}

export default Information