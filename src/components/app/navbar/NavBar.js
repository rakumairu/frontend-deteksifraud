// Import React and clsx
import React from 'react'
import clsx from 'clsx'

// Import component from material-ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
// import Settings from './Settings'


// Show navbar
const NavBar = (props) => {
  return (
    <AppBar
      position="fixed"
      className={clsx(props.classes.appBar, {
        [props.classes.appBarShift]: props.open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          className={clsx(props.classes.menuButton, props.open && props.classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={ props.classes.title }>
          { props.title }
        </Typography>
        {/* Disabled feature */}
        {/* <Settings /> */}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar