import { useState } from 'react';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [snackColor, setSnackColor] = useState('error');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return {
    open,
    setOpen,
    message,
    setMessage,
    snackColor,
    setSnackColor,
    handleClose,
  };
};
