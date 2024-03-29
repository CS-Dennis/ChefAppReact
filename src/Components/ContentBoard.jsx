import { Grid, Paper, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { nginxURL } from '../Services/config'
import ImageFrame from './ImageFrame'
import InformationCard from './InformationCard'
import IngredientsComponent from './IngredientsComponent'
import RatingComponent from './RatingComponent'
import RecipeDetail from './RecipeDetail'

export default function ContentBoard() {
  const { recipes } = useContext(AppContext);
  const [paperElevation, setPaperElevation] = useState([]);
  const initPaperElevation = recipes.map(() => 0);

  const [displayRecipeByIndex, setDisplayRecipeByIndex] = useState(null);
  const [displayContentBoard, setDisplayContentBoard] = useState(true);


  // remember the scrollY position before displaying the RecipeDetail component
  const [scrollY, setScrollY] = useState(0);

  const changeElevation = (index) => {
    if (paperElevation[index] === 0) {
      paperElevation[index] = 5;
      setPaperElevation([...paperElevation]);
    } else {
      paperElevation[index] = 0;
      setPaperElevation([...paperElevation]);
    }
  }

  const displayRecipeDetail = (index) => {
    setDisplayContentBoard(false);
    setDisplayRecipeByIndex(index);
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    setPaperElevation([...initPaperElevation]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes.length])

  useEffect(() => {
    if (displayContentBoard) {
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 200);
    }

    setPaperElevation([...initPaperElevation]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayContentBoard])

  return (
    <>
      {/* ContentBoard component */}
      <>
        {/* Recipe counter component */}
        {displayContentBoard &&
          <Paper elevation={2} sx={{ padding: '10px 20px', backgroundColor: '#2b2d42', color: '#edf2f4' }}>
            <Box sx={{ fontWeight: 500 }} >{recipes.length} recipe{recipes.length > 1 ? 's' : ''} saved</Box>
          </Paper>
        }
        {displayContentBoard && recipes.map((recipe, index) =>
          <Paper key={index} elevation={2} sx={{ padding: '10px 20px', margin: '10px 0' }}>
            <Grid container sx={{ padding: '10px 0px' }}>
              <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }} >
                <Box onClick={() => displayRecipeDetail(index)} sx={{ cursor: 'pointer' }}>
                  <Box className="recipeName">{recipe.recipeName}</Box>
                  <Box sx={{ height: '5px', width: '100%', backgroundColor: '#d90429', borderRadius: '5px', marginBottom: '10px' }}></Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={10} md={8} sx={{ paddingBottom: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
                  <Paper onClick={() => displayRecipeDetail(index)} onMouseEnter={() => changeElevation(index)} onMouseLeave={() => changeElevation(index)} elevation={paperElevation[index]} sx={{ maxHeight: '400px', width: 'auto', borderRadius: '15px' }}>
                    {recipe.images.length > 0 ?
                      <ImageFrame imageUrl={nginxURL + recipe.images[0].url} />
                      :
                      <ImageFrame imageUrl={'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71wm9Cq8bsL.jpg'} />
                    }

                  </Paper>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <RatingComponent rating={recipe.rating} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={2} md={4} >
                {/* shown on sm or smaller */}
                <Stack sx={{ display: { sm: 'block', md: 'none' }, paddingBottom: '10px' }}>
                  <InformationCard title={'Servings'} data={recipe.information.servings || ""} />
                  <InformationCard title={'Prep Time'} data={recipe.information.prepTime || ""} />
                  <InformationCard title={'Cooking Time'} data={recipe.information.cookingTime || ""} />
                  <InformationCard title={'Calories'} data={recipe.information.calories || ""} />
                </Stack>

                {/* shown on md or larger */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Stack direction={'row'} sx={{ paddingBottom: '10px' }} >
                    <InformationCard title={'Servings'} data={recipe.information.servings || ""} />
                    <InformationCard title={'Prep Time'} data={recipe.information.prepTime || ""} />
                    <InformationCard title={'Cooking Time'} data={recipe.information.cookingTime || ""} />
                    <InformationCard title={'Calories'} data={recipe.information.calories || ""} />
                  </Stack>

                  <Box>
                    <IngredientsComponent ingredients={recipe.ingredients} />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ display: { sm: 'block', md: 'none' } }}>
                <IngredientsComponent ingredients={recipe.ingredients} />
              </Grid>
            </Grid>
          </Paper>
        )}

      </>

      {/* RecipeDetail */}
      <>
        {!displayContentBoard &&
          <RecipeDetail recipeIndex={displayRecipeByIndex} setDisplayContentBoard={setDisplayContentBoard} />
        }
      </>
    </>
  )
}
