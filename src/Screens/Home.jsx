import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ContentBoard from '../Components/ContentBoard'
import SearchBar from '../Components/SearchBar'
import SideMenu from '../Components/SideMenu'

import Recipes from '../Data/Recipe.json';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    setRecipes(Recipes.data);
  }

  useEffect(() => {
    getRecipes();
  }, [])


  return (
    <>
      <Grid container className={'body'}>
        <Grid item xs={1}>
          <SideMenu />
        </Grid>

        <Grid item xs={11}>
          <SearchBar />

          <ContentBoard recipes={recipes} />
        </Grid>
      </Grid>

    </>
  )
}
