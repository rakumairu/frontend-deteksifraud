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

import { wsAddress } from '../../assets/js/constant'


// Display dashboard on realtime fraud detection
class Dashboard extends React.Component {

  // Event emitter
  emitter = ee({})

  constructor() {
    super()

    // Initialize state
    this.state = {
      data: [],
      anomalyTotal: 0,
      anomalyPercentage: 0,
      totalData: 0,
      isLoading: true,
      snackMessage: '',
      snackVariant: ''
    }

    // Create ReconnectingWebsocket
    this.rws = new ReconnectingWebSocket(wsAddress)
  }

  componentDidMount() {
    // Change current document title
    document.title = 'Dashboard | RPP'

    // Set current mount status to true
    this._isMounted = true

    // Get oldstate from localstorage
    let oldState = localStorage.getItem('oldState')
    if (oldState !== null) {
      this.setState(JSON.parse(oldState), () => {
        this.setState({isLoading: false})
      })
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
      this.handleMessage(event)
    })

    // Handle new message
    this.emitter.on('new-message', (message) => {
      this.worker.postMessage({
        message: message.data,
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

  handleMessage = event => {
    // Get message from the event
    const message = event.data

    // Turn off isLoading state
    if (this.state.isLoading) {
      this.setState({
        isLoading: false
      })
    }

    // Check is it a fraud transaction or not, and only update if component is mounted
    if (message.fraud && this._isMounted) {
      // Change the state value
      this.setState(prevState => ({
        data: [...prevState.data, message.data],
        anomalyTotal: prevState.anomalyTotal + 1,
        totalData: prevState.totalData + 1,
        anomalyPercentage: (((prevState.anomalyTotal + 1) / (prevState.totalData + 1)) * 100).toFixed(4),
        snackMessage: 'New Fraud Transaction Detected',
        snackVariant: 'error',
      }), () => {
        // Reset snackmessage
        this.setState({
          snackMessage: '',
          snackVariant: '',
        }, () => {
          // Save state to localstorage
          localStorage.setItem('oldState', JSON.stringify(this.state))
        })
      })
    } else if (this._isMounted) {
      // Change the state value
      this.setState(prevState => ({
        totalData: prevState.totalData + 1,
        anomalyPercentage: (((prevState.anomalyTotal) / (prevState.totalData + 1)) * 100).toFixed(4),
      }), () => {
        // Save state to localstorage
        localStorage.setItem('oldState', JSON.stringify(this.state))
      })
    }
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