import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Import components
import Dashboard from '../../dashboard/Dashboard'
import Recap from '../../recap/Recap'
import PageNotFound from '../../404/PageNotFound'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {/* <Redirect
          exact
          from='/'
          to='/dashboard'
        /> */}
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