import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './Screens/Home';
import Profile from "./Screens/Profile";
import { ThemeProvider } from '@emotion/react';
import { MyTheme } from './MyTheme';

function App() {
  return (
    <>
      <HashRouter>
        <ThemeProvider theme={MyTheme}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='profile' element={<Profile />} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </>
  );
}

export default App;
