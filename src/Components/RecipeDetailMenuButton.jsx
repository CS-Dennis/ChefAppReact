import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function RecipeDetailMenuButton({ setShowEditRecipeDialog, setShowDeleteRecipeDialog }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const displayEditForm = () => {
    setAnchorEl(null);
    setShowEditRecipeDialog(true);
  }

  const displayShareForm = () => {
    setAnchorEl(null);
  }

  const displayDeleteForm = () => {
    setAnchorEl(null);
    setShowDeleteRecipeDialog(true);
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
        <MenuItem onClick={displayEditForm}>Edit</MenuItem>
        <MenuItem onClick={displayShareForm} disabled>Share Recipe</MenuItem>
        <MenuItem onClick={displayDeleteForm} sx={{ color: 'red' }}>Delete</MenuItem>
      </Menu>
    </>
  )
}
