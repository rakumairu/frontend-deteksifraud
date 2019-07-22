import React from 'react'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import Paper from '@material-ui/core/Paper'

import CircularIndeterminate from '../progress/CircularProgress'

class LineChartRC extends React.Component {

  prepareData = (data, timestamp) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }

		let modified = data.map(row => {
			let date = new Date(row[timestamp])
      date.setHours(0,0,0,0)
      const dateString = date.toLocaleDateString('en-GB', options)
			
			return {
				...row,
				timestamp: dateString
			}
    })
		
		let grouped = this.groupBy(modified, timestamp)
		let dataPoints = []

		Object.entries(grouped).forEach(([key, value]) => {
			dataPoints.push({
				date: key,
				transactions: value.length
			})
		})

		return dataPoints
	}

	groupBy = (items, key) => items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [
				...(result[item[key]] || []),
				item,
			],
		}), 
		{},
  )
  
  render() {
    let data = this.prepareData(this.props.data, 'timestamp')
    return (
      <div>
      { this.props.isLoading ?
        <CircularIndeterminate minHeight={'416px'} /> :
        <Paper>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={data}
              margin={{
                top: 30, right: 60, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="transactions" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      }
    </div>
    )
  }
}

export default LineChartRC