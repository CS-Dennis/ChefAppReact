import { Box } from '@mui/material'
import React from 'react'

export default function SectionTitleComponent({ title = "title" }) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box className='straightLine'></Box>
        <Box sx={{ width: '120%', textAlign: 'center', fontWeight: '500' }}>{title}</Box>
        <Box className='straightLine'></Box>
      </Box>
    </>
  )
}
