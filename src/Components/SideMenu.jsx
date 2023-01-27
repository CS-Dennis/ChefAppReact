import { Drawer, IconButton, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import Logo from './Logo';

export default function SideMenu() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = (status) => {
    setDrawerIsOpen(status);
  }

  return (
    <>
      <Box>
        <Stack direction={'column'}>
          <Box>
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuIcon color='primary' />
            </IconButton>
          </Box>
          <Box>
            <Link to={'/profile'} style={{ textDecoration: 'none' }}>
              <IconButton><AccountCircleIcon color='primary' /></IconButton>
            </Link>
          </Box>

          <Box>
            <Link to={'/addrecipe'}>
              <IconButton><PostAddIcon color='primary' /></IconButton>
            </Link>
          </Box>

          <Box>
            <Link to={'/'}>
              <IconButton><ArticleIcon color='primary' /></IconButton>
            </Link>
          </Box>

          <Box>
            <IconButton><LogoutIcon color='primary' /></IconButton>
          </Box>
        </Stack>


      </Box>

      <Drawer
        anchor={"left"}
        open={drawerIsOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: '150px' }}>
          <Box sx={{ textAlign: 'center', paddingTop: '20px', borderBottom: "0.5px solid #8d99ae" }}>
            <Logo height={'80px'} />
          </Box>
          <Box>
            <Link to={'/profile'} style={{ textDecoration: 'none', display: 'flex' }}>
              <IconButton><AccountCircleIcon color='primary' /></IconButton>
              <Box className="sideMenuText">Profile</Box>
            </Link>
          </Box>

          <Box>
            <Link to={'/addrecipe'} style={{ textDecoration: 'none', display: 'flex' }}>
              <IconButton><PostAddIcon color='primary' /></IconButton>
              <Box className="sideMenuText">Add Recipe</Box>
            </Link>
          </Box>

          <Box>
            <Link to={'/'} style={{ textDecoration: 'none', display: 'flex' }}>
              <IconButton><ArticleIcon color='primary' /></IconButton>
              <Box className="sideMenuText">My Recipes</Box>
            </Link>
          </Box>

          <Box>
            <Link style={{ textDecoration: 'none', display: 'flex' }}>
              <IconButton><LogoutIcon color='primary' /></IconButton>
              <Box className="sideMenuText">Log Out</Box>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
