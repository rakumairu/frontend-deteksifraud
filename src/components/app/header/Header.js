// Import React
import React from 'react'
import { withRouter } from 'react-router-dom'

// Import Material-UI
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Assessment from '@material-ui/icons/Assessment'
import Dashboard from '@material-ui/icons/Dashboard'


// Handle data for drawer
class Header extends React.Component {

  // List of all route and its name and link
  route = [
  {
      name: 'Dashboard',
      link: '/',
      icon: <Dashboard />
    },
    {
      name: 'Recap',
      link: '/recap',
      icon: <Assessment />
    }
  ]

  // Class constructor
  constructor() {
    super()

    // Initialize state
    this.state = {
      selected: ''
    }
  }

  // Handle when component mounted
  componentDidMount() {
    // Get current pathname
    let current = this.props.location.pathname

    // Change document title
    this.props.changeTitle(this.convertName(current, this.route))

    // Save current pathname to state
    this.setState({
      selected: current
    })
  }

  // Convert pathname(link) to it's name
  convertName = (value, array) => {
    // Iterate on route array
    for (let i=0; i < array.length; i++) {
      // Check if the value is match
      if (array[i].link === value) {
        return array[i].name
      }
    }
  }

  // Handle navigate to new route
  navigate = (value) => {
    // Push link to history
    this.props.history.push(value.link)

    // Change title of the document
    this.props.changeTitle(value.name)

    // Save current selected link
    this.setState({
      selected: value.link
    })
  }

  render() {
    return (
      <List>
        {this.route.map(value => (
          <ListItem
            button 
            key={value.name} 
            onClick={this.navigate.bind(this, value)} 
            selected={this.state.selected === value.link}
          >
            <ListItemIcon>{value.icon}</ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItem>
        ))}
      </List>
    )
  }
}


export default withRouter(Header)