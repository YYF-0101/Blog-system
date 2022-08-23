import * as React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'


const SnackBar = ({ handleMessage, setMessage }) => {
  const [openMsg, setOpenMsg] = useState('')
  const [barTxt, setBarTxt] = useState('')
  const [barTimer, setBarTimer] = useState()
  const [open, setOpen] = useState(false)
  const days = 1
  const now = new Date().getTime()
  const setupTime = localStorage.getItem('setupTime')

  useEffect(() => {
    if (now - setupTime > days * 60 * 1000 * 60 * 24) {
      localStorage.clear()
    }
  }, [])

  useEffect(() => {
    switch (true) {
      case handleMessage === "success":
        setOpen(true)
        setBarTxt("You are successfully logged in")
        setBarTimer(4000)
        setOpenMsg("success")
        break;
      case handleMessage === "wrong":
        setOpen(true)
        setBarTxt(" You have entered an invalid username or password")
        setBarTimer(2000)
        setOpenMsg("error")
        break;
      case handleMessage === "logOut":
        setOpen(true)
        setBarTxt(" You are now logged out")
        setBarTimer(2000)
        setOpenMsg("error")
        break;
      default:
        break;
    }
  }, [setMessage])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={barTimer} onClose={() => handleClose()}>
        <Alert onClose={() => handleClose()} severity={openMsg} sx={{ width: '100%' }}>
          {barTxt}
        </Alert>
      </Snackbar>
    </Stack >
  )
}

Snackbar.defaultProps = {
  txt: 'Default Message',
}

Snackbar.propTypes = {
  txt: PropTypes.string,
}

export default SnackBar