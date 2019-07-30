export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return

    // Get message and state
    const message = e.data.message
    // const state = e.data.state
    
    // Parse recieved data to JSON
    let data = JSON.parse(message)

    // Send back the data
    if (data.Detect === 1) {
      postMessage({
        data: data,
        fraud: true
      })
    } else {
      postMessage({
        data: null,
        fraud: false
      })
    }
  })
}