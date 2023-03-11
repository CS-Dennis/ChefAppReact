import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'

export default function DirectionsComponent({ directions }) {
  const [currentDirections, setCurrentDirections] = useState(null);
  const initCheckMarList = directions.map(() => 0);
  const [checkMarList, setCheckMarList] = useState(initCheckMarList);

  const changeCheckMark = (index) => {
    if (checkMarList[index] === 0) {
      checkMarList[index] = 1;
    } else {
      checkMarList[index] = 0;
    }

    setCheckMarList([...checkMarList]);
  }

  useEffect(() => {
    if (directions) {
      setCurrentDirections(directions);
    }
  }, [directions])


  return (
    <>
      <Box sx={{ backgroundColor: '#edf2f4', cursor: 'pointer' }}>
        <Box sx={{ fontWeight: 500, backgroundColor: '#8d99ae', color: '#ffffff', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Directions</Box>
        {currentDirections &&
          currentDirections.map((obj, index) =>
            <Box key={index} sx={{ display: 'flex', paddingBottom: '20px' }} onClick={() => changeCheckMark(index)}>
              <Box sx={{ flex: 1 }}><b>Step {index + 1}:</b> {obj.direction}</Box>
              {checkMarList[index] === 1 && <Box sx={{ justifyContent: 'flex-start', marginLeft: '10px' }}><img src='./imgs/check-mark.png' height={30} /></Box>}
            </Box>
          )
        }
      </Box>
    </>
  )
}
