import { Grid } from '@mui/material'
import React from 'react'
import NewRecipeForm from '../Components/NewRecipeForm'
import SideMenu from '../Components/SideMenu'

export default function NewRecipe() {
  return (
    <>
      <Grid container className={'body'}>
        <Grid item xs={1}>
          <SideMenu />
        </Grid>

        <Grid item xs>
          <NewRecipeForm />
        </Grid>
      </Grid>

    </>
  )
}
