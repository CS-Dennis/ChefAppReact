import { Box, Button, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function IngredientsComponent({ ingredients }) {
  const [ingredientsList, setIngredientsList] = useState(ingredients);

  return (
    <>
      <Box sx={{ backgroundColor: '#edf2f4' }}>
        <Box sx={{ fontWeight: 500, backgroundColor: '#8d99ae', color: '#ffffff', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Ingredients</Box>
        <List>
          {ingredientsList.map((obj, index) =>
            <ListItem key={index}><span className='dot' ></span> <span style={{ paddingLeft: '20px' }}>{obj.ingredient}</span></ListItem>
          )}
        </List>
      </Box>
    </>
  )
}
