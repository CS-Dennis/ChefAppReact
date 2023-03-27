import { Box, Button, Dialog, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { nginxURL } from '../../Services/config';
import { validateRecipeCreateOrEditForm } from '../../Utils/utils';
import ImageFrame from '../ImageFrame';
import SectionTitleComponent from '../SectionTitleComponent';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { PhotoCamera } from '@mui/icons-material';
import Loading from '../Loading';
import SnackbarMessage from '../SnackbarMessage';
import { updateRecipe, uploadFile } from '../../Services/apis';
import { AppContext } from '../../App';
import axios from 'axios';
import Compressor from 'compressorjs';

export default function EditRecipeDialog({ showEditRecipeDialog, setShowEditRecipeDialog, currentRecipe }) {
  const context = useContext(AppContext);
  const [hideLoading, setHideLoading] = useState(true);
  const originalSnackbarSettings = {
    open: false,
    duration: 5000,
    type: "error",
    message: ""
  }
  const [snackbarSettings, setSnackbarSettings] = useState({ ...originalSnackbarSettings })

  const [recipeName, setRecipeName] = useState(currentRecipe.recipeName);

  const [information, setInformation] = useState({
    servings: currentRecipe.information.servings,
    prepTime: currentRecipe.information.prepTime,
    cookingTime: currentRecipe.information.cookingTime,
    calories: currentRecipe.information.calories
  });

  const [images, setImages] = useState(currentRecipe.images.map((image) => image.url));
  const imagesCopy = JSON.parse(JSON.stringify(currentRecipe.images.map((image) => image.url)));

  const removeImage = (url) => {
    const index = images.indexOf(url);
    images.splice(index, 1);
    setImages([...images]);
  }

  const restoreImages = () => {
    setImages([...imagesCopy]);
  }

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

  const updateRecipeConfrim = () => {
    const keys = Object.keys(information);
    keys.map(key => {
      if (!isNaN(Number(information[key]))) {
        information[key] = Number(information[key])
        setInformation({ ...information });
      }
      return null;
    })

    if (validateRecipeCreateOrEditForm(recipeName, information, ingredients, directions)) {
      setHideLoading(false);
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
        recipeId: currentRecipe.recipeId,
        recipeName: recipeName,
        images: imagesPayload,
        information: information,
        ingredients: ingredientsPayload,
        directions: directionsPayload,
        modified: (new Date()).getTime()
      }
      updateRecipe(payload).then(res => {
        if (res.status === 200 && res.data !== null) {
          setSnackbarSettings({ ...originalSnackbarSettings, open: true, type: "success", message: "Updated successfully" });
          context.setGetRecipesFlag(true);
          setShowEditRecipeDialog(false);
        }
      }).finally(() => {
        setHideLoading(true);
      })

    } else {
      setSnackbarSettings({ ...originalSnackbarSettings, open: true, type: "error", message: "Error, please fill the form correctly." });
      setHideLoading(true);
    }
  }

  return (
    <>
      <Loading hide={hideLoading} />
      <SnackbarMessage open={snackbarSettings.open} close={() => setSnackbarSettings({ ...snackbarSettings, open: false })} duration={snackbarSettings.duration} type={snackbarSettings.type} message={snackbarSettings.message} />
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
              <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }}>
                <Box sx={{ display: 'flex', overflowX: 'auto' }}>{
                  images.length > 0
                    ? images.map(image =>
                      <Box key={image} sx={{ margin: "5px 10px", position: 'relative' }}>
                        <ImageFrame imageUrl={nginxURL + image} />
                        <Button variant='contained' sx={{ position: 'absolute', top: '10px', left: '10px' }} onClick={() => removeImage(image)}>Delete</Button>
                      </Box>
                    )
                    : <ImageFrame imageUrl={"https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71wm9Cq8bsL.jpg"} />
                }</Box>
              </Grid>
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
              <Button variant='outlined' onClick={() => updateRecipeConfrim()}>Update</Button>
              <Button variant='outlined' onClick={() => { setShowEditRecipeDialog(false); restoreImages(); }}>Cancel</Button>
            </Box>
          </Box>

        </Box>
      </Dialog>
    </>
  )
}
