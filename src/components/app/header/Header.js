// Import React
import React from 'react'
import { withRouter } from 'react-router-dom'

// Import Material-UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';

const route = [
  {
    name: 'Dashboard',
    link: '/',
    icon: <Home />
  },
  {
    name: 'Recap',
    link: '/recap',
    icon: <Home />
  }
]

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
  }

  componentDidMount() {
    let current = this.props.location.pathname
    this.props.changeTitle(this.convertName(current, route))
    this.setState({
      selected: current
    })
  }

  convertName = (value, array) => {
    for (let i=0; i < array.length; i++) {
      if (array[i].link === value) {
        return array[i].name
      }
    }
  }

  navigate = (value) => {
    this.props.history.push(value.link)
    this.props.changeTitle(value.name)
    this.setState({
      selected: value.link
    })
  }

  render() {
    return (
      <List>
        {route.map(value => (
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