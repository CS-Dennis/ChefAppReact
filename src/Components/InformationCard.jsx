import { Box } from '@mui/system'
import React from 'react'
import FlatwareIcon from '@mui/icons-material/Flatware';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function InformationCard({ title, data }) {
  return (
    <>
      <Box sx={{ width: '100%', height: '98px', border: '2px solid black', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ alignSelf: 'center', textAlign: 'center', }}>
          <Box>
            {title === 'Servings' ? <FlatwareIcon /> : <></>}
            {title === 'Prep Time' ? <AlarmOnIcon /> : <></>}
            {title === 'Cooking Time' ? <SoupKitchenIcon /> : <></>}
            {title === 'Calories' ? <LocalFireDepartmentIcon /> : <></>}
          </Box>
          <Box sx={{ fontWeight: 500 }}>{title}</Box>
          <Box>{data} {title === "Prep Time" || title === "Cooking Time" ? "min" : ""}{((title === "Prep Time" || title === "Cooking Time") && data > 1) ? "s" : ''}</Box>
        </Box>
      </Box>
    </>
  )
}
