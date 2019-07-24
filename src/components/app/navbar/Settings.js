// Import React
import React, { useState } from 'react'

// Import material-ui component
import SettingsIcon from '@material-ui/icons/Settings'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'


// Display settings of the app
// Currently disabled
const Settings = () => {
  // Store open condition of the modal
  const [open, setOpen] = useState(false)

  // Store column name of class
  const [classColumn, setClassColumn] = useState('')

  // Store column name of timestamp
  const [timestampColumn, setTimestampColumn] = useState('')

  // Handle event to open the modal
  const openSettings = () => {
    // Get current value from localstorage
    let tempClass = localStorage.getItem('classColumn')
    let tempTimestamp = localStorage.getItem('timestampColumn')

    // Change the value of classColumn and timesstampColumn
    setClassColumn(tempClass === null ? '' : tempClass)
    setTimestampColumn(tempTimestamp === null ? '' : tempTimestamp)

    // Open the modal
    setOpen(true)
  }

  // Handle saving new settings
  const saveSettings = () => {
    // Save new settings to localstorage
    localStorage.setItem('classColumn', classColumn)
    localStorage.setItem('timestampColumn', timestampColumn)

    // Close the modal
    setOpen(false)
  }

  // Handle cancel changing the settings
  const cancelSettings = () => {
    // Set current value to empty strings
    setClassColumn('')
    setTimestampColumn('')

    // Close the modal
    setOpen(false)
  }

  // Handle which settings currently edited
  const changeColumn = (event) => {
    // Get id and value from the event
    const {id, value} = event.target

    // Check which field is changed
    if (id === 'class_column') {
      // Change current classColumn
      setClassColumn(value)
    } else if (id === 'timestamp_column') {
      // Change current timestampColumn
      setTimestampColumn(value)
    }
  }

  return (
    <div>
      <IconButton
        color='inherit'
        aria-label='Settings'
        onClick={ openSettings }
        edge='end'
      >
        <SettingsIcon />
      </IconButton>
      <Dialog open={ open } onClose={ cancelSettings } aria-labelledby="settings-title">
        <DialogTitle id="settings-title">Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can configure the name of class and timestamp column
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="class_column"
            label="Class Column Name"
            type="text"
            fullWidth
            onChange={ changeColumn }
            value={ classColumn }
          />
          <TextField
            margin="dense"
            id="timestamp_column"
            label="Timestamp Column Name"
            type="text"
            fullWidth
            onChange={ changeColumn }
            value={ timestampColumn }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ cancelSettings } color="primary">
            Cancel
          </Button>
          <Button onClick={ saveSettings } color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Settings