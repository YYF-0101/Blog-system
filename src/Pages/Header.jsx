import Box from '@mui/material/Box'
import { Button, Toolbar, IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../Resources/API';

const Header = ({ logOut }) => {


  return (
    <Box sx={{
      flexGrow: 1,
    }}>
      <Toolbar
        sx={{
          display: 'flex',
          borderBottom: 1
        }}>
        <Box>
          LOGO
        </Box>

        {auth() === true &&
          <Box
            sx={{
              ml: 'auto'
            }}>
            <IconButton><AccountCircleIcon /></IconButton>
            <IconButton onClick={() => logOut()}><LogoutIcon /></IconButton>
          </Box>
        }
      </Toolbar>
    </Box >
  )
}

export default Header