import { Box, Button, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function IngredientsComponent({ ingredients }) {
  const [ingredientsList, setIngredientsList] = useState([]);

  const test = () => {
    console.log(ingredientsList);
  }

  // useEffect(() => {
  //   if (ingredients !== undefined) {
  //     setIngredientsList([...ingredients]);
  //     setIngredientsList([3, 2, 1]);
  //     console.log(ingredients);
  //   }

  // }, [])
  useEffect(() => {
    setIngredientsList(ingredients);
  }, [])

  return (
    <>
      <Box sx={{ backgroundColor: '#edf2f4' }}>
        <Box sx={{ fontWeight: 500, backgroundColor: '#8d99ae', color: '#ffffff', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Ingredients</Box>
        <List>
          {ingredientsList.map((ingredient, index) =>
            <ListItem key={index}><span className='dot' ></span> <span style={{ paddingLeft: '20px' }}>{ingredient}</span></ListItem>
          )}
        </List>
      </Box>
    </>
  )
}
