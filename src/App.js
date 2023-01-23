import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './Screens/Home';
import Profile from "./Screens/Profile";
import { ThemeProvider } from '@emotion/react';
import { MyTheme } from './MyTheme';
import NewRecipe from './Screens/NewRecipe';
import { useEffect } from 'react';
import NoSleep from 'nosleep.js';

function App() {
  const noSleep = new NoSleep();


  useEffect(() => {
    document.addEventListener('touchstart', function enableNoSleep() {
      document.removeEventListener('touchstart', enableNoSleep, false);
      noSleep.enable();
    }, false);

  }, [])


  return (
    <>
      <HashRouter>
        <ThemeProvider theme={MyTheme}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='addrecipe' element={<NewRecipe />} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </>
  );
}

export default App;
