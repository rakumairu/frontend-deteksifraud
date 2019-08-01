// Import React
import React from 'react'

// Import necessary components for chart
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

// Import material-ui component
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Import styles
import useStyles from '../../app/Styles'


// Display line chart
const LineChartRC = props => {

  // Prepare the data to be used by chart
  const prepareData = (data, timestamp) => {
    // Options for convertin datetime to string
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }

    // Generate modified data
		let modified = data.map(row => {
      let date = new Date(row[timestamp])
      date.setHours(date.getHours(),0,0,0)
      const dateString = date.toLocaleDateString('en-GB', options)
			
			return {
				...row,
				[timestamp]: dateString
			}
    })

    // Group results based on timestamp
    let grouped = groupBy(modified, timestamp)

    // Initialize data to be used
		let dataPoints = []

    // Generate array of objects
		Object.entries(grouped).forEach(([key, value]) => {
			dataPoints.push({
				date: key,
				transactions: value.length
			})
		})

		return dataPoints
	}

  // Group items based on key
	const groupBy = (items, key) => items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [
				...(result[item[key]] || []),
				item,
			],
		}), 
		{},
  )

  // Initialize prepared data
  let data = prepareData(props.data, 'Timestamps')

  const classes = useStyles()

  return (
    <Paper className={ classes.lineChart }>
      <Typography variant="h5" component="h3" style={ {textAlign: 'center'} }>
        Line Chart
      </Typography>
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
  )
}

export default LineChartRC