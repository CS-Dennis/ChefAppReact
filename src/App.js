import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './Screens/Home';
import Profile from "./Screens/Profile";
import { ThemeProvider } from '@emotion/react';
import { MyTheme } from './MyTheme';
import NewRecipe from './Screens/NewRecipe';
import { createContext, useEffect, useState } from 'react';
import NoSleep from 'nosleep.js';

export const AppContext = createContext(null);

function App() {
  const noSleep = new NoSleep();

  const [getRecipesFlag, setGetRecipesFlag] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    document.addEventListener('touchstart', function enableNoSleep() {
      document.removeEventListener('touchstart', enableNoSleep, false);
      noSleep.enable();
    }, false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppContext.Provider value={{ getRecipesFlag: getRecipesFlag, setGetRecipesFlag: setGetRecipesFlag, recipes: recipes, setRecipes: setRecipes }}>
        <HashRouter>
          <ThemeProvider theme={MyTheme}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='addrecipe' element={<NewRecipe />} />
            </Routes>
          </ThemeProvider>
        </HashRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
