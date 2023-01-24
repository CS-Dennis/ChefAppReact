import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import SectionTitleComponent from './SectionTitleComponent'

export default function NewRecipeForm() {
  const [recipeName, setRecipeName] = useState("");
  const [imageURL, setImageURL] = useState("");

  const initRecipeInformation = {
    servings: "",
    prepTime: "",
    cookingTime: "",
    calories: "",
  }
  const [recipeInformation, setRecipeInformation] = useState(initRecipeInformation);

  const [ingredients, setIngredients] = useState([""]);
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

    console.log(ingredients.length);
    // focuse on the last text field
    setTimeout(() => {
      document.getElementById('ingredient' + (ingredients.length)).focus();
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
      console.log("check");
    }
  }

  const [directions, setDirections] = useState([""]);
  const [hideNewDirectionInput, setHideNewDirectionInput] = useState(false);

  const updateDirections = (index, direction) => {
    console.log(direction);
    console.log(index);
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
      console.log("check");
    }
  }

  const validateForm = () => {
    return true;
  }

  const createRecipe = () => {
    if (validateForm) {
      console.log(recipeName);
      console.log(imageURL);
      console.log(recipeInformation);
      console.log(ingredients);
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={2} md={3} />
        <Grid item xs={12} sm={8} md={6} >
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Box><SectionTitleComponent title='Create A New Recipe' /></Box>
            <Box sx={{ margin: '10px 0' }}><TextField required label='Recipe Name' variant='outlined' color='primary' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} sx={{ width: '100%' }} /></Box>
            <Box sx={{ margin: '10px 0' }}><TextField label='Image URL (Optional)' variant='outlined' color='primary' value={imageURL} onChange={(e) => setImageURL(e.target.value)} sx={{ width: '100%' }} /></Box>

            <Box><SectionTitleComponent title='Recipe Information' /></Box>
            <Box sx={{ margin: '10px 0' }}><TextField label='Servings (Optional)' variant='outlined' color='primary' value={recipeInformation.servings} onChange={(e) => setRecipeInformation({ ...recipeInformation, servings: e.target.value })} sx={{ width: '100%' }} /></Box>
            <Box sx={{ margin: '10px 0' }}><TextField label='Prep Time (min) (Optional)' variant='outlined' color='primary' value={recipeInformation.prepTime} onChange={(e) => setRecipeInformation({ ...recipeInformation, prepTime: e.target.value })} sx={{ width: '100%' }} /></Box>
            <Box sx={{ margin: '10px 0' }}><TextField label='Cooking Time (min) (Optional)' variant='outlined' color='primary' value={recipeInformation.cookingTime} onChange={(e) => setRecipeInformation({ ...recipeInformation, cookingTime: e.target.value })} sx={{ width: '100%' }} /></Box>
            <Box sx={{ margin: '10px 0' }}><TextField label='Calories (Optional)' variant='outlined' color='primary' value={recipeInformation.calories} onChange={(e) => setRecipeInformation({ ...recipeInformation, calories: e.target.value })} sx={{ width: '100%' }} /></Box>

            <Box><SectionTitleComponent title='Ingredients' /></Box>
            {ingredients.map((ingredient, index) =>
              <Box key={index} sx={{ margin: '10px 0' }}>
                {index === 0 ? <TextField required id={'ingredient' + index} onChange={(e) => { updateIngredients(index, e.target.value) }} onBlur={removeEmptyIngredientInput} label={'Ingredient ' + (index + 1)} variant='outlined' color='primary' value={ingredients[index]} sx={{ width: '100%' }} /> :
                  <TextField id={'ingredient' + index} onChange={(e) => { updateIngredients(index, e.target.value) }} onBlur={removeEmptyIngredientInput} label={'Ingredient ' + (index + 1)} variant='outlined' color='primary' value={ingredients[index]} sx={{ width: '100%' }} />}
              </Box>
            )}
            {!hideNewIngredientInput && <Box sx={{ margin: '10px 0' }}><TextField onClick={addIngredientInput} label='New Ingredient' variant='outlined' color='primary' value={''} sx={{ width: '100%' }} /></Box>}

            <Box><SectionTitleComponent title='Directions' /></Box>
            {directions.map((direction, index) =>
              <Box key={index} sx={{ margin: '10px 0' }}>
                {index === 0 ? <TextField required id={'direction' + index} onChange={(e) => { updateDirections(index, e.target.value) }} onBlur={removeEmptyDirectionInput} label={'Direction ' + (index + 1)} variant='outlined' color='primary' value={directions[index]} sx={{ width: '100%' }} /> :
                  <TextField id={'direction' + index} onChange={(e) => { updateDirections(index, e.target.value) }} onBlur={removeEmptyDirectionInput} label={'Direction ' + (index + 1)} variant='outlined' color='primary' value={directions[index]} sx={{ width: '100%' }} />}
              </Box>
            )}
            {!hideNewDirectionInput && <Box sx={{ margin: '10px 0' }}><TextField onClick={addDirectionInput} label='New Direction' variant='outlined' color='primary' value={''} sx={{ width: '100%' }} /></Box>}

            <Box><Button variant='contained' onClick={createRecipe}>Create</Button></Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2} md={3} />
      </Grid>
    </>
  )
}
