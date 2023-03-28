// import { TabPanel } from '@mui/lab';
import { Box, Grid, IconButton, Tab, Tabs } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import DirectionsComponent from './DirectionsComponent';
import ImageFrame from './ImageFrame';
import InformationCard from './InformationCard';
import IngredientsComponent from './IngredientsComponent';
import RecipeDetailMenuButton from './RecipeDetailMenuButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { nginxURL } from '../Services/config';
import DeleteRecipeDialog from './Dialogs/DeleteRecipeDialog';
import EditRecipeDialog from './Dialogs/EditRecipeDialog';
import { AppContext } from '../App';

export default function RecipeDetail({ recipeIndex, setDisplayContentBoard }) {
  const { recipes } = useContext(AppContext);

  const [tabValue, setTabValue] = useState(0);

  // delete dialog vars
  const [showDeleteRecipeDialog, setShowDeleteRecipeDialog] = useState(false);

  // edit dialog vars
  const [showEditRecipeDialog, setShowEditRecipeDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Grid container sx={{ backgroundColor: "#fff" }}>
        <Grid item xs={12} md={3} />
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <IconButton onClick={() => setDisplayContentBoard(true)} variant="contained" sx={{ margin: '10px' }}><KeyboardBackspaceIcon /></IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'end', flex: 1 }}>
            <Box sx={{ alignSelf: 'center', margin: '10px' }}>
              <RecipeDetailMenuButton setShowEditRecipeDialog={setShowEditRecipeDialog} setShowDeleteRecipeDialog={setShowDeleteRecipeDialog} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} />

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box>
            <Box className="recipeName">{recipes[recipeIndex].recipeName}</Box>
            <Box sx={{ height: '5px', width: '100%', backgroundColor: '#d90429', borderRadius: '5px', marginBottom: '10px' }}></Box>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }}>
          <Box sx={{ display: 'flex', overflowX: 'auto' }}>{
            recipes[recipeIndex].images.length > 0
              ? recipes[recipeIndex].images.map(image =>
                <Box key={image.url} sx={{ margin: "5px 10px" }}>
                  <ImageFrame imageUrl={nginxURL + image.url} />
                </Box>
              )
              : <ImageFrame imageUrl={"https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71wm9Cq8bsL.jpg"} />
          }</Box>
        </Grid>

        <Grid item xs={12} md={3} />
        <Grid item xs={12} md={6} sx={{ minHeight: '500px' }}>
          {recipes[recipeIndex].information &&
            <Stack direction={'row'}>
              <InformationCard title={'Servings'} data={recipes[recipeIndex].information.servings} />
              <InformationCard title={'Prep Time'} data={recipes[recipeIndex].information.prepTime} />
              <InformationCard title={'Cooking Time'} data={recipes[recipeIndex].information.cookingTime} />
              <InformationCard title={'Calories'} data={recipes[recipeIndex].information.calories} />
            </Stack>
          }

          <Tabs textColor='secondary' indicatorColor='primary' value={tabValue} onChange={(event, value) => { setTabValue(value) }}>
            <Tab label="Ingredients" id={'simple-tab-0'} aria-controls={'simple-tabpanel-0'} />
            <Tab label="Directions" id={'simple-tab-1'} aria-controls={'simple-tabpanel-1'} />
          </Tabs>

          {
            recipes[recipeIndex].ingredients && tabValue === 0 &&
            <IngredientsComponent ingredients={recipes[recipeIndex].ingredients} />
          }

          {
            recipes[recipeIndex].directions && tabValue === 1 &&
            <DirectionsComponent key={tabValue} directions={recipes[recipeIndex].directions} />
          }
        </Grid>
        <Grid item xs={12} md={3} />
      </Grid>

      {/* All dialogs for the menu button */}
      <EditRecipeDialog showEditRecipeDialog={showEditRecipeDialog} setShowEditRecipeDialog={setShowEditRecipeDialog} currentRecipe={recipes[recipeIndex]} />
      <DeleteRecipeDialog showDeleteRecipeDialog={showDeleteRecipeDialog} setShowDeleteRecipeDialog={setShowDeleteRecipeDialog} recipeId={recipes[recipeIndex].recipeId} setDisplayContentBoard={setDisplayContentBoard} />
    </>
  )
}
