import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { validateFloat } from '../../Utils/utils';
import SectionTitleComponent from '../SectionTitleComponent';

export default function EditRecipeDialog({ showEditRecipeDialog, setShowEditRecipeDialog, currentRecipe }) {
  const [recipeName, setRecipeName] = useState(currentRecipe.recipeName);

  const [information, setInformation] = useState({
    servings: currentRecipe.information.servings,
    prepTime: currentRecipe.information.prepTime,
    cookingTime: currentRecipe.information.cookingTime,
    calories: currentRecipe.information.calories
  });
  const [images, setImages] = useState(currentRecipe.images.map((image) => image.url));

  const [ingredients, setIngredients] = useState(currentRecipe.ingredients.map((ingredient) => ingredient.ingredient));
  const [hideNewIngredientInput, setHideNewIngredientInput] = useState(false);

  const updateIngredients = (index, ingredient) => {
    ingredients[index] = ingredient;
    setIngredients([...ingredients]);

    //if the last input is now empty show add new ingredient input
    if (ingredients[ingredients.length - 1].trim() !== "") {
      setHideNewIngredientInput(false);
    } else {
      setHideNewIngredientInput(true);
    }
  }

  const addIngredientInput = () => {
    // add a new element in the list
    setIngredients([...ingredients, ""]);

    // focuse on the last text field
    setTimeout(() => {
      document.getElementById('ingredient' + (ingredients.length)).focus();
      document.getElementById('ingredient' + (ingredients.length)).click();
    }, 100);

    // hide ifself
    setHideNewIngredientInput(true);
  }

  const removeEmptyIngredientInput = () => {
    const numsOfIngredients = ingredients.length;
    if (ingredients[numsOfIngredients - 1].trim() === "") {
      ingredients.pop();
      setIngredients([...ingredients]);
      setHideNewIngredientInput(false);
    }
  }

  const [directions, setDirections] = useState(currentRecipe.directions.map((direction) => direction.direction));
  const [hideNewDirectionInput, setHideNewDirectionInput] = useState(false)
  const updateDirections = (index, direction) => {
    directions[index] = direction;
    setDirections([...directions]);

    //if the last input is now empty show add new direction input
    if (directions[directions.length - 1].trim() !== "") {
      setHideNewDirectionInput(false);
    } else {
      setHideNewDirectionInput(true);
    }
  }

  const addDirectionInput = () => {
    // add a new element in the list
    setDirections([...directions, ""]);

    // focuse on the last text field
    setTimeout(() => {
      document.getElementById('direction' + (directions.length)).focus();
    }, 100);

    // hide ifself
    setHideNewDirectionInput(true);
  }

  const removeEmptyDirectionInput = () => {
    const numsOfDirections = directions.length;
    if (directions[numsOfDirections - 1].trim() === "") {
      directions.pop();
      setDirections([...directions]);
      setHideNewDirectionInput(false);
    }
  }

  const validateForm = () => {
    if (validateFloat("1")) {
      return true;
    } else {
      return false;
    }
  }

  const updateRecipe = () => {
    if (validateForm()) {
      console.log("recipeId: ", currentRecipe.recipeId);
      console.log(recipeName);
      console.log(information);
      console.log(images);
      console.log(ingredients);
      console.log(directions);
    }
  }

  useEffect(() => {
    console.log(currentRecipe);
  }, [])


  return (
    <>
      <Dialog open={showEditRecipeDialog} fullWidth={true}>
        <Box >
          <Box>
            <DialogTitle>Edit Recipe</DialogTitle>
          </Box>
          <Box sx={{ padding: '20px' }}>
            <Box>
              <SectionTitleComponent title='Recipe Name' />
              <TextField label="Recipe Name" value={recipeName} sx={{ width: '100%' }} onChange={(e) => setRecipeName(e.target.value)} />
            </Box>
            <Box>
              <SectionTitleComponent title='Recipe Photos' />
            </Box>
            <Box>
              <SectionTitleComponent title='Recipe Information' />
              <Box className='inputField'>
                <TextField label="Servings (Optional)" type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9.]*' }} value={information.servings} sx={{ width: '100%' }} onChange={(e) => setInformation({ ...information, servings: e.target.value })} />
              </Box>
              <Box className='inputField'>
                <TextField label="Prep Time (min) (Optional)" type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9.]*' }} value={information.prepTime} sx={{ width: '100%' }} onChange={(e) => setInformation({ ...information, prepTime: e.target.value })} />
              </Box>
              <Box className='inputField'>
                <TextField label="Cooking Time (min) (Optional)" type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9.]*' }} value={information.cookingTime} sx={{ width: '100%' }} onChange={(e) => setInformation({ ...information, cookingTime: e.target.value })} />
              </Box>
              <Box className='inputField'>
                <TextField label="Calories (min) (Optional)" type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9.]*' }} value={information.calories} sx={{ width: '100%' }} onChange={(e) => setInformation({ ...information, calories: e.target.value })} />
              </Box>
            </Box>
            <Box>
              <SectionTitleComponent title='Ingredients' />
              {ingredients.map((ingredient, index) =>
                <Box key={index} className='inputField'><TextField id={"ingredient" + index} label={"Ingredient " + (index + 1)} value={ingredients[index]} sx={{ width: '100%' }} onChange={(e) => updateIngredients(index, e.target.value)} onBlur={removeEmptyIngredientInput} /></Box>
              )}
              {!hideNewIngredientInput && <Box className="inputField"><TextField onClick={addIngredientInput} label='New Ingredient' variant='outlined' color='primary' value={''} sx={{ width: '100%' }} /></Box>}
            </Box>
            <Box>
              <SectionTitleComponent title='Directions' />
              {directions.map((direction, index) =>
                <Box key={index} className='inputField'><TextField id={"direction" + index} label={"Direction " + (index + 1)} value={directions[index]} sx={{ width: '100%' }} onChange={(e) => updateDirections(index, e.target.value)} onBlur={removeEmptyDirectionInput} /></Box>
              )}
              {!hideNewDirectionInput && <Box className="inputField"><TextField onClick={addDirectionInput} label='New Direction' variant='outlined' color='primary' value={''} sx={{ width: '100%' }} /></Box>}
            </Box>
            <Box sx={{ padding: '10px', width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
              <Button variant='outlined' onClick={() => updateRecipe()}>Update</Button>
              <Button variant='outlined' onClick={() => setShowEditRecipeDialog(false)}>Cancel</Button>
            </Box>
          </Box>

        </Box>
      </Dialog>
    </>
  )
}
