import React, { Component } from 'react'

import CanvasJSReact  from '../../../assets/js/canvasjs.react'
import CircularIndeterminate from '../progress/CircularProgress'

import Paper from '@material-ui/core/Paper'

let Chart = CanvasJSReact.CanvasJSChart

class PieChart extends Component {
  render() {
    const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Transactions"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%<br /><b>Total</b>: {amount}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: this.props.normalPercentage, label: "Normal Transactions", amount: this.props.normal },
					{ y: this.props.anomalyPercentage, label: "Fraud Transactions", amount: this.props.anomaly }
				]
			}]
    }
    return (
      <div>
				{ this.props.isLoading ?
					<CircularIndeterminate minHeight={'416px'} /> :
					<Paper>
						<Chart options={ options } style={ { overflow: '-webkit-paged-x' } }/>
					</Paper>
				}
      </div>
      )
  }
}

export default PieChart