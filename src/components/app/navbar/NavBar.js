// Import React and clsx
import React from 'react'

// Import component from material-ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Header from '../header/Header'


// Show navbar
const NavBar = (props) => {
  return (
    <AppBar
      position="fixed"
      className={props.classes.appBar}
    >
      <Toolbar>
        <Typography variant="h6" noWrap className={ props.classes.title } color='secondary'>
          RPP
        </Typography>
        <Header />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar