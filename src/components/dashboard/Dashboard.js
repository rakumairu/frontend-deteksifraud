// Import React
import React from 'react'

// Import ReconnectingWebsocet and event-emitter
import ReconnectingWebSocket from 'reconnecting-websocket'
import ee from 'event-emitter'

// Import view component
import Component from './Component'

// Import required component for web worker
import WebWorker from '../../webWorker'
import worker from './dashboard.worker'


// Display dashboard on realtime fraud detection
class Dashboard extends React.Component {

  // Server name
  server = 'wss://rpp-backend.herokuapp.com/ulb/predict/'

  // Event emitter
  emitter = ee({})

  constructor() {
    super()

    // Initialize state
    this.state = {
      data: [],
      column: null,
      anomalyTotal: 0,
      anomalyPercentage: 0,
      totalData: 0,
      isLoading: true,
      snackMessage: '',
      snackVariant: ''
    }

    // Create ReconnectingWebsocket
    this.rws = new ReconnectingWebSocket(this.server)
  }

  componentDidMount() {
    // Change current document title
    document.title = 'Dashboard | RPP'

    // Set current mount status to true
    this._isMounted = true

    // Get oldstate from localstorage
    let oldState = localStorage.getItem('oldState')
    if (oldState !== null) {
      this.setState(JSON.parse(oldState))
    }

    // Add onopen event listener on websoket
    this.rws.addEventListener('open', () => {
      this.rws.send('Connected')
    })

    // Add onmessage event listener on websocket
    this.rws.addEventListener('message', (data, flags) => {
      this.emitter.emit('new-message', data)
    })
    
    // Initiated new worker
    this.worker = new WebWorker(worker)

    // Event listener for worker
    this.worker.addEventListener('message', (event) => {
      const newState = event.data
      this.setState(newState)
      this.setState({
        snackMessage: '',
        snackVariant: ''
      })
      localStorage.setItem('oldState', JSON.stringify(newState))
    })

    // Handle new message
    this.emitter.on('new-message', (message) => {
      this.worker.postMessage({
        message: message.data,
        state: this.state
      })
    })
  }

  componentWillUnmount() {
    // Set current mount status to false
    this._isMounted = false

    // Add onclose event listener on websocket
    this.rws.addEventListener('close', () => {
      this.rws.close(1000)
    })
  }

  render() {
    return (
      <Component
        {...this.state}
      />
    )
  }
}

export default Dashboard