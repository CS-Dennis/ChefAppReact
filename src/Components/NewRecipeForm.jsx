import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Paper, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import SectionTitleComponent from './SectionTitleComponent'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { trimString } from '../Utils/utils';
import SnackbarMessage from './SnackbarMessage';
import { createRecipe, uploadFile } from '../Services/apis';
import axios from 'axios';
import Loading from './Loading';
import { nginxURL } from '../Services/config';
import MockUser from '../Data/UserConfig.json';
import Compressor from 'compressorjs';

export default function NewRecipeForm() {
  const [recipeName, setRecipeName] = useState("");

  const initRecipeInformation = {
    servings: 0,
    prepTime: 0,
    cookingTime: 0,
    calories: 0,
  }
  const [recipeInformation, setRecipeInformation] = useState(initRecipeInformation);
  const [images, setImages] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [hideNewIngredientInput, setHideNewIngredientInput] = useState(false);

  const [hideLoading, setHideLoading] = useState(true);

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
    }

    console.log(numsOfIngredients);
  }

  const [directions, setDirections] = useState([]);
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
    }
  }



  const [snackbarSettings, setSnackbarSettings] = useState({
    open: false,
    duration: 4000,
    type: 'error',
    message: "You can only upload 2 photos maximum at a time."
  })




  const uploadPhotos = (files) => {
    if (files.length > 5) {
      // if more than files selected to upload, show error
      setSnackbarSettings({ ...snackbarSettings, open: true, type: 'error', message: "You can only upload 5 photos maximum at a time." });
    } else {
      const selectedFilesFormData = [];
      const uploadFilesPromises = [];

      setHideLoading(false);

      Array.from(files).forEach(() => {
        selectedFilesFormData.push(new FormData());
      });

      selectedFilesFormData.forEach((fileFormData, index) => {
        fileFormData.append("file", files[index]);
        uploadFilesPromises.push(uploadFile(fileFormData));
      });

      axios.all(uploadFilesPromises).then(res => {
        const allFilesNames = [];
        res.forEach(uploadedFile => {
          allFilesNames.push(uploadedFile.data);
        });
        setImages([...images, ...allFilesNames]);
        setHideLoading(true)
      });
    };
  }

  function compressImage(image, quality) {
    new Compressor(image, {
      quality: quality,
      success(compressedImage) {
        if (compressedImage.size / 1024 > 2048) {

          console.log(compressedImage.size / 1024);
          const newQual = quality - 0.5 > 0 ? quality - 0.5 : 0.1;
          compressImage(image, newQual);
        } else if (compressedImage.size / 1024 < 1024) {
          const newQual = quality + 0.1;
          compressImage(image, newQual);
        } else {
          const photo = new FormData();
          photo.append("file", compressedImage);
          const allFilesNames = [];
          uploadFile(photo).then(res => {
            allFilesNames.push(res.data);
            setImages([...images, ...allFilesNames]);
            setHideLoading(true);
          });
        }
      }
    })

  }


  const uploadTakenPhoto = (file) => {
    if (file.length === 1) {
      setHideLoading(false);

      let rawImage = file[0];
      let compressedImage = rawImage;
      console.log(rawImage.size / 1024);
      if (rawImage.size / 1024 > 2048) {
        compressImage(rawImage, 0.9);
      } else {
        const photo = new FormData();
        photo.append("file", compressedImage);

        const allFilesNames = [];
        uploadFile(photo).then(res => {
          allFilesNames.push(res.data);
          setImages([...images, ...allFilesNames]);
          setHideLoading(true);
        });
      }
    }
  }

  const validateForm = () => {
    if (!recipeName || ingredients.length === 0 || directions.length === 0) {
      return false;
    }
    return true;
  }

  const submitRecipe = () => {
    if (validateForm()) {
      const imagesPayload = images.map((image, index) => {
        return { "sequence": index, "url": image }
      })
      const ingredientsPayload = ingredients.map((ingredient, index) => {
        return { "sequence": index, "ingredient": ingredient }
      });

      const directionsPayload = directions.map((direction, index) => {
        return { "sequence": index, "direction": direction }
      });

      const payload = {
        "userId": MockUser.id,
        "recipeName": recipeName,
        "information": {
          "servings": recipeInformation.servings || 0,
          "prepTime": recipeInformation.prepTime || 0,
          "cookingTime": recipeInformation.cookingTime || 0,
          "calories": recipeInformation.calories || 0,
        },
        "images": imagesPayload,
        "ingredients": ingredientsPayload,
        "directions": directionsPayload
      }

      console.log(payload);
      createRecipe(payload).then(res => {
        if (res.status === 200 && res.data !== null) {
          setSnackbarSettings({ ...snackbarSettings, open: true, type: 'success', message: "Recipe created successfully!" });
          // redirect to the recipedetail
        } else {
          setSnackbarSettings({ ...snackbarSettings, open: true, type: 'error', message: "You can only upload 5 photos maximum at a time." });
        }
      })
    } else {
      setSnackbarSettings({ ...snackbarSettings, open: true, type: 'error', message: "Please fill your form." });
    }
  }

  return (
    <>
      <Loading hide={hideLoading} />
      <SnackbarMessage open={snackbarSettings.open} close={() => setSnackbarSettings({ ...snackbarSettings, open: false })} duration={snackbarSettings.duration} type={snackbarSettings.type} message={snackbarSettings.message} />
      <Grid container>
        <Grid item xs={12} sm={2} md={3} />
        <Grid item xs={12} sm={8} md={6} >
          <Paper elevation={3} sx={{ padding: '20px' }}>
            {/* Recipe Name */}
            <Box><SectionTitleComponent title='Create A New Recipe' /></Box>
            <Box className="inputField"><TextField required label='Recipe Name' variant='outlined' color='primary' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} onBlur={() => setRecipeName(trimString(recipeName))} sx={{ width: '100%' }} /></Box>

            {/* Upload photos */}
            <Box><SectionTitleComponent title='Recipe Photos' /></Box>
            {images.map(image =>
              <Box key={image} sx={{ display: 'flex', placeContent: 'center' }}><img src={nginxURL + image} alt={image} width="90%" /></Box>
            )}
            <Box sx={{ margin: '10px 0', display: 'flex', placeContent: 'center', width: '100%' }}>
              <IconButton color='primary' component="label">
                <input hidden accept="image/*" multiple type="file" onChange={(e) => uploadPhotos(e.target.files)} />
                <UploadFileIcon />
              </IconButton>

              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" capture="camera" onChange={(e) => uploadTakenPhoto(e.target.files)} />
                <PhotoCamera />
              </IconButton>
            </Box>

            <Box><SectionTitleComponent title='Recipe Information' /></Box>
            <Box className="inputField"><TextField label='Servings (Optional)' variant='outlined' color='primary' type={'number'} value={recipeInformation.servings} onChange={(e) => setRecipeInformation({ ...recipeInformation, servings: e.target.value })} sx={{ width: '100%' }} /></Box>
            <Box className="inputField"><TextField label='Prep Time (min) (Optional)' variant='outlined' color='primary' type={'number'} value={recipeInformation.prepTime} onChange={(e) => setRecipeInformation({ ...recipeInformation, prepTime: e.target.value })} sx={{ width: '100%' }} /></Box>
            <Box className="inputField"><TextField label='Cooking Time (min) (Optional)' variant='outlined' color='primary' type={'number'} value={recipeInformation.cookingTime} onChange={(e) => setRecipeInformation({ ...recipeInformation, cookingTime: e.target.value })} sx={{ width: '100%' }} /></Box>
            <Box className="inputField"><TextField label='Calories (Optional)' variant='outlined' color='primary' type={'number'} value={recipeInformation.calories} onChange={(e) => setRecipeInformation({ ...recipeInformation, calories: e.target.value })} sx={{ width: '100%' }} /></Box>

            <Box><SectionTitleComponent title='Ingredients' /></Box>
            {ingredients.length > 0 && ingredients.map((ingredient, index) =>
              <Box key={index} className="inputField">
                {index === 0 ? <TextField required id={'ingredient' + index} onChange={(e) => { updateIngredients(index, e.target.value) }} onBlur={removeEmptyIngredientInput} label={'Ingredient ' + (index + 1)} variant='outlined' color='primary' value={ingredients[index]} sx={{ width: '100%' }} /> :
                  <TextField id={'ingredient' + index} onChange={(e) => { updateIngredients(index, e.target.value) }} onBlur={removeEmptyIngredientInput} label={'Ingredient ' + (index + 1)} variant='outlined' color='primary' value={ingredients[index]} sx={{ width: '100%' }} />}
              </Box>
            )}
            {!hideNewIngredientInput && <Box className="inputField"><TextField onClick={addIngredientInput} label='New Ingredient' variant='outlined' color='primary' value={''} sx={{ width: '100%' }} /></Box>}

            <Box><SectionTitleComponent title='Directions' /></Box>
            {directions.length > 0 && directions.map((direction, index) =>
              <Box key={index} className="inputField">
                {index === 0 ? <TextField required id={'direction' + index} onChange={(e) => { updateDirections(index, e.target.value) }} onBlur={removeEmptyDirectionInput} label={'Direction ' + (index + 1)} variant='outlined' color='primary' value={directions[index]} sx={{ width: '100%' }} /> :
                  <TextField id={'direction' + index} onChange={(e) => { updateDirections(index, e.target.value) }} onBlur={removeEmptyDirectionInput} label={'Direction ' + (index + 1)} variant='outlined' color='primary' value={directions[index]} sx={{ width: '100%' }} />}
              </Box>
            )}
            {!hideNewDirectionInput && <Box className="inputField"><TextField onClick={addDirectionInput} label='New Direction' variant='outlined' color='primary' value={''} sx={{ width: '100%' }} /></Box>}

            <Box><Button variant='contained' onClick={submitRecipe}>Create</Button></Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2} md={3} />
      </Grid>
    </>
  )
}
