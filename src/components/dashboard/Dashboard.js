// Import React
import React from 'react'

// Import ReconnectingWebsocet and event-emitter
import ReconnectingWebSocket from 'reconnecting-websocket'
import ee from 'event-emitter'

// Import view component
import Component from './Component'


// Display dashboard on realtime fraud detection
class Dashboard extends React.Component {

  // Server name
  server = 'localhost:8000/predict/'

  // Event emitter
  emitter = ee({})

  constructor() {
    super()

    // Initialize state
    this.state = {
      data: [],
      allData: [],
      column: null,
      anomalyTotal: 0,
      anomalyPercentage: 0,
      normalTotal: 0,
      isLoading: true,
      snackMessage: '',
      snackVariant: ''
    }

    // Create ReconnectingWebsocket
    this.rws = new ReconnectingWebSocket('ws://' + this.server)
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

    // Handle new message
    this.emitter.on('new-message', this.handleMessage)
  }

  componentWillUnmount() {
    // Set current mount status to false
    this._isMounted = false

    // Add onclose event listener on websocket
    this.rws.addEventListener('close', () => {
      this.rws.close(1000)
    })
  }

  // Handle incoming message
  handleMessage = message => {
    // Parse recieved data to JSON
    let data = JSON.parse(message.data)

    // Get old and all data from state
    let oldData = this.state.data
    let allData = this.state.allData

    // Push new data to the array
    oldData.push(data)
    allData.push(data)

    // Get all column from the data
    const originalHeader = Object.keys(data)

    // Set class and timestamp column name
    const classHeader = 'status'
    const timestampHeader = 'timestamp'

    /*
      Disabled features
    */
    // const classHeader = localStorage.getItem('classColumn')
    // const timestampHeader = localStorage.getItem('timestampColumn')

    // Initialize column array for tabel data
    let column = []

    // Check if column is null on state
    if (this.state.column === null) {
      // Generate column data acording to required value
      column = originalHeader.map((head) => {
        if (head === timestampHeader) {
          return {
              title: head,
              field: head,
              defaultSort: 'desc',
              type: 'datetime'
            }
        } else {
          return {
            title: head,
            field: head
          }
        }
      })
    } else {
      // Set column with old column
      column = this.state.column
    }

    // Calculate the amount and percentage on fraud data
    let amount = allData.filter(row => row[classHeader] === 1).length
    let percentage = (amount / allData.length) * 100

    // Calculate the amount and percentage on normal data
    let normalAmount = allData.length - amount
    let normalPercentage = (normalAmount / allData.length) * 100

    // Prepare new state to be compared with old state
    let newState = {
      data: oldData.filter(row => row[classHeader] === 1),
      allData: allData,
      column: column,
      isLoading: false,
      anomalyTotal: amount,
      anomalyPercentage: percentage.toFixed(2),
      normalTotal: normalAmount,
      normalPercentage: normalPercentage.toFixed(2)
    }

    // Check if the data in localstorage is different with the new one
    if (localStorage.getItem('oldState') !== JSON.stringify(newState) && this._isMounted) {
      // Check if the new data is fraud
      if (data[classHeader] === 1) {
        // Trigger notification
        this.setState({
          snackMessage: 'New Fraud Transaction Detected',
          snackVariant: 'error'
        })
        this.setState({
          snackMessage: '',
          snackVariant: ''
        })
      }
      // Save new data to localstorage and state
      localStorage.setItem('oldState', JSON.stringify(newState))
      this.setState(newState)
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