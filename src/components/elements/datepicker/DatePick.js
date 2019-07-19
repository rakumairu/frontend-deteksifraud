import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function DatePick(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        variant='inline'
        inputVariant='outlined'
        id={ props.id }
        label={ props.label }
        value={ props.value }
        onChange={ props.changeDate }
        disableFuture={ props.disableFuture }
        format="dd/MM/yyyy"
        style={{fontSize: '12px'}}
      />
    </MuiPickersUtilsProvider>
  );
}