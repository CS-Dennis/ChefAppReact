import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading({ hide }) {
  return (
    <>
      {!hide &&
        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'rgba(84,86,109,0.3)', position: 'fixed', top: 0, left: 0 }}>
          <Box sx={{ position: 'fixed', left: '50%', top: '50%' }}>
            <CircularProgress />
          </Box>
        </Box>
      }
    </>
  )
}
