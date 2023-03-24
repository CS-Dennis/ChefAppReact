import { Box, Button, Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import { colors } from '../../MyTheme';

export default function DeleteRecipeDialog({ showDeleteRecipeDialog, setShowDeleteRecipeDialog }) {
  const deleteRecipe = () => {
    console.log("delete recipe");
  }

  return (
    <>
      <Dialog onClose={() => setShowDeleteRecipeDialog(false)} open={showDeleteRecipeDialog} >
        <Box sx={{ display: "flex" }} >
          <DialogTitle>Delete this recipe?</DialogTitle>
        </Box>

        <Box sx={{ display: "flex" }} >
          <Box sx={{ display: 'flex', padding: '10px', width: '100%', justifyContent: 'space-evenly', }}>
            <Button variant='outlined' sx={{ color: colors.red, width: '30%' }} onClick={deleteRecipe}>Yes</Button>
            <Button variant='outlined' sx={{ width: '30%' }} onClick={() => setShowDeleteRecipeDialog(false)}>No</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
