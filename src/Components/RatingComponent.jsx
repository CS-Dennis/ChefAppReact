import { Button, Rating } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'

export default function RatingComponent({ rating }) {
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    setCurrentRating(rating);
  }, [])

  return (
    <>
      <Box>
        <Rating
          name="rating"
          value={currentRating}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        />
      </Box>
    </>
  )
}
