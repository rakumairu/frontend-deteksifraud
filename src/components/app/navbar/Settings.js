import React, { useState } from 'react'

import SettingsIcon from '@material-ui/icons/Settings'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

const Settings = () => {
  const [open, setOpen] = useState(false)
  const [classColumn, setClassColumn] = useState('')
  const [timestampColumn, setTimestampColumn] = useState('')

  const openSettings = () => {
    let tempClass = localStorage.getItem('classColumn')
    let tempTimestamp = localStorage.getItem('timestampColumn')
    setClassColumn(tempClass === null ? '' : tempClass)
    setTimestampColumn(tempTimestamp === null ? '' : tempTimestamp)
    setOpen(true)
  }

  const saveSettings = () => {
    localStorage.setItem('classColumn', classColumn)
    localStorage.setItem('timestampColumn', timestampColumn)
    setOpen(false)
  }

  const cancelSettings = () => {
    setClassColumn('')
    setTimestampColumn('')
    setOpen(false)
  }

  const changeColumn = (event) => {
    const {id, value} = event.target
    if (id === 'class_column') {
      setClassColumn(value)
    } else if (id === 'timestamp_column') {
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