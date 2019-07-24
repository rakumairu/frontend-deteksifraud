// Import React
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import clsx from 'clsx'

// Import Material-UI
import { useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

// Import Components
import Routes from './routes/Routes'
import NavBar from './navbar/NavBar'
import AppDrawer from './appdrawer/AppDrawer'

import useStyles from './Styles'


// Handle app overall
const App = () => {
  // Browser history for router
  const browserHistory = createBrowserHistory()
  // Use styles and themes
  const classes = useStyles()
  const theme = useTheme()
  // Hooks for drawer condition and title of document
  const [open, setOpen] = React.useState(true)
  const [title, setTitle] = React.useState('Dashboard')

  // Handle opening drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  }

  // Handle closing drawer
  const handleDrawerClose = () => {
    setOpen(false);
  }

  // Handle change on title
  const changeTitle = newTitle => {
    setTitle(newTitle)
  }

  // Render interface
  return (
    <div className={ classes.root }>
      <CssBaseline />
      <NavBar
        classes={ classes }
        open={ open }
        handleDrawerOpen={ handleDrawerOpen }
        title={ title }
      />
      <Router history={browserHistory}>
        <AppDrawer
          classes={ classes }
          open={ open }
          handleDrawerClose={ handleDrawerClose }
          theme={ theme }
          changeTitle={ changeTitle }
        />
        <Container maxWidth='xl'>
        <main
          className={clsx(classes.content, {
            [ classes.contentShift ]: open,
          })}
        >
          <div className={ classes.drawerHeader } />
          <Routes />
        </main>
        </Container>
      </Router>
    </div>
  )
}

export default App