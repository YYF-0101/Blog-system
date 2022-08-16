import { useState } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { auth } from '../utils';


const HomePage = ({ authUser }) => {
  // test@gradspace.org  qwer1234

  const defaultUser = {
    email: '',
    password: '',
  }

  const [user, setUser] = useState(defaultUser)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Box sx={{}}>
        <Box sx={{ mx: 'auto', width: 500 }}> <h3>Log in</h3></Box>
        {!auth() &&
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
              label={'Email'}
              id="margin-dense"
              margin="dense"
              onChange={e => handleChange(e)}
            />
            <TextField
              name='password'
              label={'Password'}
              id="margin-dense"
              margin="dense"
              onChange={e => handleChange(e)}
            />

            <Button type='submit' onClick={() => authUser(user)}>
              Log In
            </Button>
          </Box>
        }
      </Box>
    </>
  )

}

export default HomePage