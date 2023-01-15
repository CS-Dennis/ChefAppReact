import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function RecipeDetailMenuButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const displayEditForm = () => {
    setAnchorEl(null);
    console.log("edit form");
  }

  const displayShareForm = () => {
    setAnchorEl(null);
    console.log("share form");
  }

  return (
    <>
      <IconButton onClick={(event) => handleClick(event)}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={displayEditForm}>Edit Recipe</MenuItem>
        <MenuItem onClick={displayShareForm}>Share with Friend</MenuItem>
      </Menu>
    </>
  )
}
