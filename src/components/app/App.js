// Import React
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Import Material-UI
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

// Import Components
import Routes from './routes/Routes'
import NavBar from './navbar/NavBar'

import useStyles from './Styles'


// Handle app overall
const App = () => {
  // Initialize theme for the app
  let theme = createMuiTheme({
    palette: {
      primary: {
        light: '#474b52',
        main: '#20232a',
        dark: '#000000',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#9affff',
        main: '#61dafb',
        dark: '#10a8c8',
        contrastText: '#000000',
      },
    },
  })
  
  // Use responsive font size for the theme
  theme = responsiveFontSizes(theme)
  
  // Use styles and themes
  const classes = useStyles(theme)

  // Render interface
  return (
    <div className={ classes.root }>
      <MuiThemeProvider theme={ theme }>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Router>
              <Container maxWidth='lg'>
                <NavBar
                  classes={ classes }
                />
                <div className={ classes.drawerHeader } />
                <Routes/>
              </Container>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </div>
  )
}

export default App