import { Box, Button, Dialog, DialogTitle } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { colors } from '../../MyTheme';
import { deleteRecipe } from '../../Services/apis';

export default function DeleteRecipeDialog({ showDeleteRecipeDialog, setShowDeleteRecipeDialog, recipeId, setDisplayContentBoard }) {
  const { getRecipesFlag, setGetRecipesFlag } = useContext(AppContext);


  const deleteRecipeConfirmed = () => {
    console.log(recipeId);
    console.log(getRecipesFlag);


    deleteRecipe({ recipeId: recipeId }).then(res => {
      console.log(res);
      if (res.status === 200 && res.data === "Deleted") {
        setGetRecipesFlag(true);
        setShowDeleteRecipeDialog(false);
        setDisplayContentBoard(true);
      } else {
        // show error snackbar
      }
    })
  }

  return (
    <>
      <Dialog onClose={() => setShowDeleteRecipeDialog(false)} open={showDeleteRecipeDialog} >
        <Box sx={{ display: "flex" }} >
          <DialogTitle>Delete this recipe?</DialogTitle>
        </Box>

        <Box sx={{ display: "flex" }} >
          <Box sx={{ display: 'flex', padding: '10px', width: '100%', justifyContent: 'space-evenly', }}>
            <Button variant='outlined' sx={{ color: colors.red, width: '30%' }} onClick={deleteRecipeConfirmed}>Yes</Button>
            <Button variant='outlined' sx={{ width: '30%' }} onClick={() => setShowDeleteRecipeDialog(false)}>No</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
