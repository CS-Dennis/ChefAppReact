import { Box } from '@mui/material'
import React from 'react'

export default function ImageFrame({ imageUrl }) {
  return (
    <>
      <Box sx={{ width: 'auto', maxWidth: '600px', height: '400px', borderRadius: '15px', boxShadow: '2px 2px 7px #8d99ae', display: 'flex', justifyContent: 'center' }}>
        <img src={imageUrl} alt="recipe" style={{ width: 'auto', maxWidth: '600px', height: '100%', borderRadius: '15px', cursor: 'grab', userSelect: 'none', placeSelf: 'center' }} draggable="false" />
      </Box>
    </>
  )
}
