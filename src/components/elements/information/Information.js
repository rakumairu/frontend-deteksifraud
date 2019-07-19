import React, { Component } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import CircularIndeterminate from '../progress/CircularProgress'

const classes = makeStyles({
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
})

class Information extends Component {
  render() {
    return (
      <div>
        { this.props.isLoading ?
          <CircularIndeterminate minHeight={'416px'} /> :
          <Tooltip title={this.props.subtitle}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  { this.props.title }
                </Typography>
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                  { this.props.title }
                </Typography> */}
                <Typography variant={this.props.contentVariant} component="p">
                  { this.props.content }
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Detail</Button>
              </CardActions> */}
            </Card>
          </Tooltip>
        }
      </div>
    )
  }
}

export default Information