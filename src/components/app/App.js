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

const App = () => {
  const browserHistory = createBrowserHistory()
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [title, setTitle] = React.useState('Dashboard')

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const changeTitle = newTitle => {
    setTitle(newTitle)
  }

  return (
    <div className={ classes.root }>
      <CssBaseline />
      <NavBar
        classes={ classes }
        open={ open }
        handleDrawerOpen={ handleDrawerOpen }
        title={ title }
      />
      <Router histpry={browserHistory}>
        <AppDrawer
          classes={ classes }
          open={ open }
          handleDrawerClose={ handleDrawerClose }
          theme={ theme }
          changeTitle={ changeTitle }
        />
        <Container maxWidth='lg'>
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