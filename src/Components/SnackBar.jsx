import * as React from 'react'
import { useState, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const SnackBar = ({ openMsg, open, handleClose }) => {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {openMsg == "success" &&
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            You are successfully logged in
          </Alert>
        </Snackbar>
      }
      {openMsg == "unsuccess" &&
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            You have entered an invalid username or password
          </Alert>
        </Snackbar>
      }
    </Stack>


  )
}

export default SnackBar