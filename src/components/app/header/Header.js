// Import React
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

// Import Material-UI
import Button from '@material-ui/core/Button';

// Import Constant Value
import { route } from '../../../assets/js/constant'


// Handle data for drawer
const Header2 = (props) => {
  // Hooks handle selected component
  const [selected, setSelected] = useState('')

  // Handle when component mounted
  useEffect(() => {
    // Handle change of pathname
    const changeSelected = value => {
      setSelected(value)
    }

    // Get current pathname
    let current = props.location.pathname

    // Check if current pathname is the same as selected
    if (current !== selected) {
      changeSelected(current)
    }
  })

  // Handle navigate to new route
  const navigate = (value) => {
    // Push link to history
    props.history.push(value.link)

    // Save current selected link
    setSelected(value.link)
  }

  return (
    <span style={ {flexGrow: 15} }>
      {route.map(value => (
        <Button 
          key={ value.name } 
          onClick={ navigate.bind(this, value) } 
          color='inherit'
          style={ {marginRight: '12px'} }
        >
          { value.name }
        </Button>
      ))}
    </span>
  )
}


export default withRouter(Header2)