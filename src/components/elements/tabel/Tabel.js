import React from 'react'

import MaterialTable from "material-table"

import CircularIndeterminate from '../progress/CircularProgress'

// Styles for anomaly
const anomalyStyles = {
  backgroundColor: '#f8d7da',
  color: '#721c24'
}

// Styles for normal
const normalStyles = {
  backgroundColor: '#d1ecf1',
  color: '#0c5460'
}

class Tabel extends React.Component {
  prepareData = (data, timestamp) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }

		let modified = data.map(row => {
			let date = new Date(row[timestamp])
      const dateString = date.toLocaleString('en-GB', options)
			
			return {
				...row,
				timestamp: dateString
			}
    })

    return modified
  }

  render() {
    let data = this.prepareData(this.props.data, 'timestamp')
    return (
      ( this.props.isLoading ?
        <CircularIndeterminate minHeight={'416px'} /> :
        <MaterialTable
          title={ this.props.title }
          columns={ this.props.column }
          data={ data }
          options={{
            rowStyle: rowData => {
              // const l = Object.keys(rowData).length
              // const h = Object.keys(rowData)[l - 2]
              const h = localStorage.getItem('timestampColumn')
              return (rowData[h] === 0 ? normalStyles : anomalyStyles)
            }
          }}
        />
      )
    )
  }
}

export default Tabel