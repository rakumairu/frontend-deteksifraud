import React, { Component } from 'react';

import CanvasJSReact  from '../../../assets/js/canvasjs.react'
import CircularIndeterminate from '../progress/CircularProgress'

import Paper from '@material-ui/core/Paper'

let Chart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {

	prepareDataPoints = (datas, timestamp) => {
		let data = datas

		let modified = data.map(row => {
			let date = new Date(row[timestamp])
			date.setHours(0,0,0,0)
			
			return {
				...row,
				timestamp: date
			}
		})
		
		let grouped = this.groupBy(modified, timestamp)
		let dataPoints = []

		Object.entries(grouped).forEach(([key, value]) => {
			dataPoints.push({
				x: new Date(key),
				y: value.length
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
		let dataPoints = this.prepareDataPoints(this.props.dataPoints, 'timestamp')
		const options = {
			animationEnabled: true,
			title:{
				text: this.props.title
			},
			axisX: {
				valueFormatString: "DD/MM"
			},
			axisY: {
				title: "Fraud Transaction",
				// prefix: "$",
				includeZero: true
			},
			data: [{
				// yValueFormatString: "$#,###",
				xValueFormatString: "DD/MM",
				type: "spline",
				dataPoints: dataPoints
			}]
		}
		
		return (
      <div>
      { this.props.isLoading ?
        <CircularIndeterminate minHeight={'416px'} /> :
        <Paper>
          <Chart options={ options }/>
        </Paper>
      }
    </div>
		)
	}
}

export default LineChart