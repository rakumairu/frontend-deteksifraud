// Import React
import React from 'react';

// Import required library for datetime
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';


// Datepicker component
export default function DatePick(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        clearable
        variant='inline'
        id={ props.id }
        label={ props.label }
        value={ props.value }
        onChange={ props.changeDate }
        disableFuture={ props.disableFuture }
        format="dd/MM/yyyy"
        style={ {fontSize: '12px', marginRight: '12px'} }
      />
    </MuiPickersUtilsProvider>
  );
}