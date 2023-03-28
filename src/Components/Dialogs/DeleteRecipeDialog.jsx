import { Box, Button, Dialog, DialogTitle } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../App';
import { colors } from '../../MyTheme';
import { deleteRecipe } from '../../Services/apis';
import Loading from '../Loading';
import SnackbarMessage from '../SnackbarMessage';

export default function DeleteRecipeDialog({ showDeleteRecipeDialog, setShowDeleteRecipeDialog, recipeId, setDisplayContentBoard }) {
  const { getRecipesFlag, setGetRecipesFlag } = useContext(AppContext);
  const [hideLoading, setHideLoading] = useState(true);
  const originalSnackbarSettings = {
    open: false,
    duration: 5000,
    type: "error",
    message: ""
  }
  const [snackbarSettings, setSnackbarSettings] = useState({ ...originalSnackbarSettings })

  const deleteRecipeConfirmed = () => {
    setHideLoading(false);
    deleteRecipe({ recipeId: recipeId }).then(res => {
      if (res.status === 200 && res.data === "Deleted") {
        setSnackbarSettings({ ...originalSnackbarSettings, open: true, type: "success", message: "Deleted successfully" });
        setTimeout(() => {
          setGetRecipesFlag(true);
          setShowDeleteRecipeDialog(false);
          setDisplayContentBoard(true);
        }, 1000);
      } else {
        // show error snackbar
      }
    }).finally(() => {
      setHideLoading(true);
    });
  }

  return (
    <>
      <Loading hide={hideLoading} />
      <SnackbarMessage open={snackbarSettings.open} close={() => setSnackbarSettings({ ...snackbarSettings, open: false })} duration={snackbarSettings.duration} type={snackbarSettings.type} message={snackbarSettings.message} />
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
