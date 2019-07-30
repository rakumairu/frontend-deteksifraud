// Import React
import React from 'react'

// Import view component
import Component from './Component'

import { restAddress } from '../../assets/js/constant'


// Display recap data from Rest API
class Recap extends React.Component {

  // Abortcontroller to abort asynchronous task
  abortController = new AbortController()

  constructor() {
    super()

    // Initialize state
    this.state = {
      data: [],
      fullData: [],
      column: null,
      anomalyTotal: 0,
      anomalyPercentage: 0,
      normalTotal: 0,
      isLoading: true,
      snackMessage: '',
      snackVariant: '',
      startDate: null,
      endDate: new Date()
    }
  }

  componentDidMount() {
    // Change current document title
    document.title = 'Recap | RPP'

    // Set mount status to true
    this._isMounted = true

    // Fetch the data from the Rest API
    this.fetchData()
  }

  componentWillUnmount() {
    // Abort fetch if the component unmounted
    this.abortController.abort()
  }

  // Handle startdate changes
  changeStartDate = event => {
    // Set new startdate to state
    this.setState({
      startDate: event
    })

    // Filter the data based on the new date limitation
    this.filterData(event, this.state.endDate)
  }
  
  // Handle enddate changes
  changeEndDate = event => {
    // Set new endDate to state
    this.setState({
      endDate: event
    })

    // Filter the data based on the new date limitations
    this.filterData(this.state.startDate, event)
  }

  // Handle change date on button click
  changeRange = (duration) => {
    // Generate new end and start date based on current time
    let end = new Date()
    let start = new Date()

    // Change the start date based on duration
    switch(duration) {
      case 'week':
        start.setDate(end.getDate() - 7)
        break
      case 'month':
        start.setMonth(end.getMonth() - 1)
        break
      case 'year':
        start.setFullYear(end.getFullYear() - 1)
        break
      default:
        start = null
        break
    }

    // Save startdate and enddate to state
    this.setState({
      startDate: start,
      endDate: end,
    })

    // Filter the data based on date limitations
    this.filterData(start, end)
  }

  // Filter the data based on startdate and enddate
  filterData = (start, end) => {
    // Set time of end date to last hoaurs
    end.setHours(23,59,59,999)
    
    // Initialize new filtered data
    let filtered = []

    // Check if startdate is exist
    if (start !== null) {
      // Set time of start date to beginning hours
      start.setHours(0,0,0,0)
      
      // Generate filtered data
      filtered = this.state.fullData.filter(row => {
        let timestamp = new Date(row['Timestamps'])
        if (timestamp.getTime() >= start.getTime() && timestamp <= end.getTime()) {
          return true
        }
        return false
      })
    } else {
      // Generate filtered data
      filtered = this.state.fullData.filter(row => {
        let timestamp = new Date(row['Timestamps'])
        if (timestamp <= end.getTime()) {
          return true
        }
        return false
      })
    }

    // Save new filtered data to state
    this.setState({
      data: filtered
    })
  }

  // Handle fetch data from Rest API
  fetchData = () => {
    // Fetch to Rest API restAddress with abort signal
    fetch(restAddress, { signal: this.abortController.signal })
    // Check if reponse is ok
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
    .then(response => {
      // Compare new and current data
      if (response !== this.state.data) {
        // Create header configuration for table columns
        const originalHeader = Object.keys(response[0])
        const classHeader = 'Detect'
        const timestampHeader = 'Timestamps'

        // Generate new column data
        const column = originalHeader.map((head) => {
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

        // Calculate the amount and percentage on fraud data
        let amount = response.filter(row => row[classHeader] === 1).length
        let percentage = (amount / response.length) * 100

        // Calculate the amount and percentage on normal data
        let normalAmount = response.length - amount
        let normalPercentage = (normalAmount / response.length) * 100

        // Prepare new state data
        let newState = {
          data: response.filter(row => row[classHeader] === 1),
          fullData: response.filter(row => row[classHeader] === 1),
          column: column,
          isLoading: false,
          anomalyTotal: amount,
          anomalyPercentage: percentage.toFixed(2),
          normalTotal: normalAmount,
          normalPercentage: normalPercentage.toFixed(2)
        }

        // Save new state to state
        this.setState(newState)

        // Trigger the notification
        this.setState({
          snackMessage: 'Succesfully fetch data',
          snackVariant: 'success'
        })

        this.setState({
          snackMessage: '',
          snackVariant: ''
        })
      }
    })
    .catch(e => {
      // Trigger notification on error
      this.setState({
        snackMessage: 'Something went wrong',
        snackVariant: 'warning'
      })

      this.setState({
        snackMessage: '',
        snackVariant: ''
      })
    })
  }

  render() {
    return (
      <Component
        changeStartDate={ this.changeStartDate }
        changeEndDate={ this.changeEndDate }
        changeRange={ this.changeRange }
        {...this.state}
      />
    )
  }
}

export default Recap