import * as React from 'react'
import { useEffect, useState } from 'react'
import { messageData } from '../utils'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'


const SnackBar = ({ message }) => {
  const [openMsg, setOpenMsg] = useState(false)
  const [msg, setMsg] = useState({})

  useEffect(() => {
    message &&
      setOpenMsg(true)
    setMsg(messageData.filter((e) => e.label === message))
  }, [message])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMsg(false)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      {msg.length > 0 &&
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={openMsg} autoHideDuration={msg[0].time} onClose={() => handleClose()}>
            <Alert onClose={() => handleClose()} severity={msg[0].id} sx={{ width: '100%' }}>
              {msg[0].txt}
            </Alert>
          </Snackbar>
        </Stack >}
    </>
  )
}

export default SnackBar