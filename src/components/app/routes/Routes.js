// Import React and Router
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import components
import Dashboard from '../../dashboard/Dashboard'
import Recap from '../../recap/Recap'
import PageNotFound from '../../404/PageNotFound'

// Handle routing on the app
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          component={ Dashboard }
        />
        <Route
          path='/recap'
          component={ Recap }
        />
        <Route
          component={ PageNotFound }
        />
      </Switch>
    )
  }
}

export default Routes