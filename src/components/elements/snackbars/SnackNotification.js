// Import React
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';


// Display notification
const SnackNotification = props => {

  // Use snackbar
  const { enqueueSnackbar } = useSnackbar();

  // Handle message
  useEffect(() => {
    if (props.message) {
      enqueueSnackbar(props.message, {variant: props.variant});
    }
  })

  return null
}

export default SnackNotification