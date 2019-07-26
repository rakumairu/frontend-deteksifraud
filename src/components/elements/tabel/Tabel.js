// Import React
import React from 'react'

// Import materialtable
import MaterialTable from "material-table"

// Import component
import CircularIndeterminate from '../progress/CircularProgress'


// Display tabel based on data
const Tabel = props => {

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

  // Prepare data to be used
  const prepareData = (data, timestamp) => {
    // Options to format datetime to string
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }

    // Generate modified data
		let modified = data.map(row => {
			let date = new Date(row[timestamp])
      const dateString = date.toLocaleString('en-GB', options)

			return {
				...row,
				[timestamp]: dateString
			}
    })

    return modified
  }

  // Initialize prepared data
  let data = prepareData(props.data, 'Timestamps')

  return (
    ( props.isLoading ?
      <CircularIndeterminate minHeight={'416px'} /> :
      <MaterialTable
        title={ props.title }
        columns={ props.column }
        data={ data }
        options={{
          rowStyle: rowData => {
            const h = 'Detect'
            return (rowData[h] === 0 ? normalStyles : anomalyStyles)
          }
        }}
      />
    )
  )
}

export default Tabel