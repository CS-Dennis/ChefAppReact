import { Box } from '@mui/material'
import React from 'react'

export default function ImageFrame({ imageUrl }) {
  return (
    <>
      <Box sx={{ width: '100%', minWidth: '250px', maxWidth: '600px', maxHeight: '400px', borderRadius: '15px', boxShadow: '2px 2px 7px #8d99ae', display: 'flex', justifyContent: 'center' }}>
        <img src={imageUrl} alt="recipe" style={{ width: '100%', maxWidth: '600px', maxHeight: '400px', borderRadius: '15px', cursor: 'grab', userSelect: 'none', placeSelf: 'center' }} draggable="false" />
      </Box>
    </>
  )
}
