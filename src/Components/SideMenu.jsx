import { IconButton, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SideMenu() {
  return (
    <>
      <Box>
        <Stack direction={'column'}>
          <Box>
            <IconButton>
              <MenuIcon color='primary' />
            </IconButton>
          </Box>
          <Box>
            <Link to={'profile'} style={{ textDecoration: 'none' }}>
              <IconButton><AccountCircleIcon color='primary' /></IconButton>
            </Link>
          </Box>

          <Box>
            <IconButton><PostAddIcon color='primary' /></IconButton>
          </Box>

          <Box>
            <IconButton><ArticleIcon color='primary' /></IconButton>
          </Box>

          <Box>
            <IconButton><LogoutIcon color='primary' /></IconButton>
          </Box>
        </Stack>


      </Box>
    </>
  )
}
