// Import React
import React from 'react'

// Import material-ui components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Info from '@material-ui/icons/Info'
import Divider from '@material-ui/core/Divider'

// Import Styles
import useStyles from '../../app/Styles'

// Import component
import CircularIndeterminate from '../progress/CircularProgress'


// Information component, displaying come information
const Information = props => {

  // Prepare the styles
  const classes = useStyles()

  // Prepare the content from the props
  const content = props.content.map(row => 
    <span key={ row.title }>
      <Typography variant="subtitle1" component="span">
        { row.title }:
      </Typography>
      <Typography variant='h2' component="p" style={ {textAlign: 'center'} }>
        { row.data }
      </Typography>
      <br/>
    </span>
   )

  return (
    <div style={ {height: '100%'} }>
      { props.isLoading ?
        <CircularIndeterminate minHeight={'416px'} /> :
        <Tooltip title={props.tooltip}>
          <Card className={classes.card}>
            <CardHeader
              avatar={ <Info /> }
              title="Fraud Transactions"
              subheader="General Information"
            />
            <Divider />
            <CardContent>
              { content }
            </CardContent>
          </Card>
        </Tooltip>
      }
    </div>
  )
}

export default Information