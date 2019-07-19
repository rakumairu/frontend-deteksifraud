import React from 'react'

import Component from './Component'

const address = 'http://localhost:8000/api/dummy_labelled/'

class Recap extends React.Component {

  constructor() {
    super()
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
    document.title = 'Recap | RPP'

    this._isMounted = true

    fetch(address)
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
        const classHeader = originalHeader[originalHeader.length - 2]
        
        const column = originalHeader.map((head, index) => {
          if (index === 0) {
            return {
                title: head,
                field: head,
                defaultSort: 'desc'
              }
          } else {
            return {
              title: head,
              field: head
            }
          }
        })
        
        let amount = response.filter(row => row[classHeader] === 1).length
        let percentage = (amount / response.length) * 100
        let normalAmount = response.length - amount
        let normalPercentage = (normalAmount / response.length) * 100

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

        this.setState(newState)
      }
    })
    .catch(e => {
      console.log('Something went wrong')
      console.log(e)
    })
  }

  changeStartDate = event => {
    this.setState({
      startDate: event
    })

    this.filterData(event, this.state.endDate)
  }
  
  changeEndDate = event => {
    this.setState({
      endDate: event
    })

    this.filterData(this.state.startDate, event)
  }

  changeRange = (duration) => {
    let end = new Date()
    let start = new Date()

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

    this.setState({
      startDate: start,
      endDate: end,
    })

    this.filterData(start, end)
  }

  filterData = (start, end) => {
    let filtered = []
    if (start !== null) {
      filtered = this.state.fullData.filter(row => {
        let timestamp = new Date(row['timestamp'])
        if (timestamp.getTime() >= start.getTime() && timestamp <= end.getTime()) {
          return true
        }
        return false
      })
    } else {
      filtered = this.state.fullData.filter(row => {
        let timestamp = new Date(row['timestamp'])
        if (timestamp <= end.getTime()) {
          return true
        }
        return false
      })
    }

    this.setState({
      data: filtered
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