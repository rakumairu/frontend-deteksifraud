import React from 'react'

import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import Header from '../header/Header'

const AppDrawer = props => {
  return (
    <Drawer
      className={props.classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: props.classes.drawerPaper,
      }}
    >
      <div className={props.classes.drawerHeader}>
        <Typography variant='h5' style={{marginRight: 'auto', marginLeft: 'auto'}}>RPP</Typography>
        <IconButton onClick={props.handleDrawerClose}>
          {props.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <Header 
        changeTitle={props.changeTitle}
      />
    </Drawer>
  )
}

export default AppDrawer