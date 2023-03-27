import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ContentBoard from '../Components/ContentBoard'
import SearchBar from '../Components/SearchBar'
import SideMenu from '../Components/SideMenu'

// import Recipes from '../Data/Recipe.json';
import { getRecipesByUserId } from '../Services/apis'
import User from '../Data/UserConfig.json';
import { AppContext } from '../App'
import Loading from '../Components/Loading'

export default function Home() {
  const { getRecipesFlag, setGetRecipesFlag, recipes, setRecipes } = useContext(AppContext);
  const [hideLoading, setHideLoading] = useState(true);
  const getRecipes = () => {
    setHideLoading(false);
    getRecipesByUserId(User.id).then(response => {
      setRecipes(response.data);
    }).finally(() => {
      setHideLoading(true);
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


          <Loading hide={hideLoading} />
          <ContentBoard recipes={recipes} />
        </Grid>
      </Grid>

    </>
  )
}
