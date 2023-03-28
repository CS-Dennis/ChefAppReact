import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function SnackbarMessage({ open, close, type, duration, message }) {


  return (
    <>
      <Snackbar open={open} autoHideDuration={duration} onClose={() => close()} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => close()} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
