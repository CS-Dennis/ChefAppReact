import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ContentBoard from '../Components/ContentBoard'
import SearchBar from '../Components/SearchBar'
import SideMenu from '../Components/SideMenu'

// import Recipes from '../Data/Recipe.json';
import { getRecipesByUserId } from '../Services/apis'
import User from '../Data/UserConfig.json';
import { AppContext } from '../App'

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  const { getRecipesFlag, setGetRecipesFlag } = useContext(AppContext);

  const getRecipes = () => {
    getRecipesByUserId(User.id).then(response => {
      console.log(response.data);
      setRecipes(response.data);
    });
  }

  useEffect(() => {
    if (getRecipesFlag) {
      getRecipes();
      setGetRecipesFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRecipesFlag])


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
