import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { auth } from '../utils'
import { apiPost } from '../services'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const HomePage = ({ setMessage }) => {
  // test@gradspace.org  qwer1234

  const defaultUser = {
    email: '',
    password: '',
  }
  const now = new Date().getTime()

  const [user, setUser] = useState(defaultUser)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    auth() && navigate("../products")
  }, [])

  const authUser = (user) => {
    apiPost('login', user)
      .then(res => {
        localStorage.setItem('luxdream-yanfengYang-token', res.data.token.token)
        setMessage("success")
        navigate("../products")
        localStorage.setItem('setupTime', now)
      })
      .catch(() => { setMessage("wrong") })
  }

  return (
    <>
      <Box sx={{}}>
        {!auth() ?
          <>
            <Box sx={{ mx: 'auto', width: 500 }}> <h3>Log in</h3></Box>
            <Box
              sx={{
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                width: 500,
                maxWidth: '100%',
              }}>
              <TextField
                name='email'
                label='Email'
                id="margin-dense1"
                margin="dense"
                onChange={e => handleChange(e)}
              />
              <TextField
                name='password'
                label='Password'
                type="password"
                id="margin-dense2"
                margin="dense"
                onChange={e => handleChange(e)}
              />

              <Button type='submit' onClick={() => authUser(user)}>
                Log In
              </Button>
            </Box>
          </>
          :
          navigate("../products")
        }
      </Box>
    </>
  )

}

export default HomePage