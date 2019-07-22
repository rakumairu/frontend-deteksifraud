import React from 'react'

import ReconnectingWebSocket from 'reconnecting-websocket'
import ee from 'event-emitter'

import Component from './Component'

const server = 'localhost:8000/predict/'
const emitter = ee({})

class Dashboard extends React.Component {

  constructor() {
    super()
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
    // this.ws = new WebSocket('ws://' + server)
    this.rws = new ReconnectingWebSocket('ws://' + server)
  }

  componentDidMount() {
    document.title = 'Dashboard | RPP'
    
    this._isMounted = true

    let oldState = localStorage.getItem('oldState')
    if (oldState !== null) {
      this.setState(JSON.parse(oldState))
    }

    this.rws.addEventListener('open', () => {
      this.rws.send('Connected')
    })

    this.rws.addEventListener('message', (data, flags) => {
      emitter.emit('new-message', data)
    })

    emitter.on('new-message', this.handleMessage)
  }

  componentWillUnmount() {
    this._isMounted = false
    this.rws.addEventListener('close', () => {
      this.rws.close(1000)
    })
  }

  handleMessage = message => {
    let classColumn = localStorage.getItem('classColumn')
    let timestampColumn = localStorage.getItem('timsetampColumn') 

    let data = JSON.parse(message.data)

    let oldData = this.state.data
    let allData = this.state.allData
    
    oldData.push(data)
    allData.push(data)
    
    const originalHeader = Object.keys(data)
    // const lastHeader = originalHeader[originalHeader.length - 2]
    const classHeader = localStorage.getItem('classColumn')
    const timestampHeader = localStorage.getItem('timestampColumn')
    let column = []
    if (this.state.column === null) {
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
      column = this.state.column
    }

    let amount = allData.filter(row => row[classHeader] === 1).length
    let percentage = (amount / allData.length) * 100
    let normalAmount = allData.length - amount
    let normalPercentage = (normalAmount / allData.length) * 100

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

    if (localStorage.getItem('oldState') !== JSON.stringify(newState)) {
      if (data[classHeader] === 1) {
        this.setState({
          snackMessage: 'New Fraud Transaction Detected',
          snackVariant: 'error'
        })
        this.setState({
          snackMessage: '',
          snackVariant: ''
        })
      }
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