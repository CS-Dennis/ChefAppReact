import { Grid } from '@mui/material'
import React from 'react'
import SideMenu from '../Components/SideMenu'

export default function Profile() {
  return (
    <>
      <Grid container className={'body'}>
        <Grid item xs={1}>
          <SideMenu />
        </Grid>
      </Grid>
    </>
  )
}
