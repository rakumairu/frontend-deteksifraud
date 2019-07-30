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

  const columns = [
    {
      "title": "Timestamps",
      "field": "Timestamps",
      "defaultSort": "desc",
    },
    {
      "title": "Detect",
      "field": "Detect",
    },
    {
      "title": "Time",
      "field": "Time",
    },
    {
      "title": "V1",
      "field": "V1",
    },
    {
      "title": "V2",
      "field": "V2",
    },
    {
      "title": "V3",
      "field": "V3",
    },
    {
      "title": "V4",
      "field": "V4",
    },
    {
      "title": "V5",
      "field": "V5",
    },
    {
      "title": "V6",
      "field": "V6",
    },
    {
      "title": "V7",
      "field": "V7",
    },
    {
      "title": "V8",
      "field": "V8",
    },
    {
      "title": "V9",
      "field": "V9",
    },
    {
      "title": "V10",
      "field": "V10",
    },
    {
      "title": "V11",
      "field": "V11",
    },
    {
      "title": "V12",
      "field": "V12",
    },
    {
      "title": "V13",
      "field": "V13",
    },
    {
      "title": "V14",
      "field": "V14",
    },
    {
      "title": "V15",
      "field": "V15",
    },
    {
      "title": "V16",
      "field": "V16",
    },
    {
      "title": "V17",
      "field": "V17",
    },
    {
      "title": "V18",
      "field": "V18",
    },
    {
      "title": "V19",
      "field": "V19",
    },
    {
      "title": "V20",
      "field": "V20",
    },
    {
      "title": "V21",
      "field": "V21",
    },
    {
      "title": "V22",
      "field": "V22",
    },
    {
      "title": "V23",
      "field": "V23",
    },
    {
      "title": "V24",
      "field": "V24",
    },
    {
      "title": "V25",
      "field": "V25",
    },
    {
      "title": "V26",
      "field": "V26",
    },
    {
      "title": "V27",
      "field": "V27",
    },
    {
      "title": "V28",
      "field": "V28",
    },
  ]

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
        columns={ columns }
        data={ data }
        options={{
          padding: 'dense',
          search: false,
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