import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

export default function SnackNotification(props) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.message) {
      enqueueSnackbar(props.message, {variant: props.variant});
    }
  })

  return null
}