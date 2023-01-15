import { IconButton, InputBase, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Logo from './Logo'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';


export default function SearchBar() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ height: '50px', width: '50px' }}>
          <Link to={"/"}><Logo height={'40px'} width={'40px'} /></Link>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={2}
            sx={{ alignItems: 'center', width: 'auto', display: 'flex' }}
          >
            <InputBase
              placeholder="Search Awesome Recipes"
              inputProps={{ 'aria-label': 'search google maps' }}
              sx={{ flex: 1, paddingLeft: '20px' }}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </>
  )
}
