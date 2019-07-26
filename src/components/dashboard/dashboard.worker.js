export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return

    console.log(e.data)

    // Get message and state
    const message = e.data.message
    const state = e.data.state
    
    // Parse recieved data to JSON
    let data = JSON.parse(message)

    // Set class and timestamp column name
    const classHeader = 'Detect'
    const timestampHeader = 'Timestamps'

    // Prepare for the new state
    let oldData = state.data
    let anomalyTotal = state.anomalyTotal
    let totalData = state.totalData + 1
    let anomalyPercentage = (anomalyTotal / totalData) * 100

    // Check if new data is anomaly
    if (data[classHeader] === 1) {
      oldData.push(data)
      anomalyTotal+=1
    }

    // Get original header
    const originalHeader = Object.keys(data)

    // Initialize column
    let column = []

    // Check if column is null on state
    if (state.column === null) {
      // Generate column data acording to required value
      column = originalHeader.map((head) => {
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
    } else {
      // Set column with old column
      column = state.column
    }

    // Prepare new state to be compared with old state
    let newState = {
      data: oldData,
      column: column,
      isLoading: false,
      anomalyTotal: anomalyTotal,
      anomalyPercentage: anomalyPercentage.toFixed(2),
      totalData: totalData,
    }

    // Trigger snackbar
    if (data[classHeader] === 1) {
      newState.snackMessage = 'New Fraud Transaction Detected'
      newState.snackVariant = 'error'
    }

    postMessage(newState)
  })
}