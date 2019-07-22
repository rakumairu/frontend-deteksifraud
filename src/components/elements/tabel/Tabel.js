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
  render() {
    return (
      ( this.props.isLoading ?
        <CircularIndeterminate minHeight={'416px'} /> :
        <MaterialTable
          title={ this.props.title }
          columns={ this.props.column }
          data={ this.props.data }
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