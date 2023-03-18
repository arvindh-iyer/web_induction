import React from "react";
import { useContext } from "react";
import { ThemeContext,ThemeProvider } from "./ThemeContext";
import {theme,darkTheme} from './theme'
import { Route,Routes } from "react-router-dom";
import { AuthPage } from "./authpage/AuthPage";
import { MainPage } from "./MainPage/MainPage";
import { DashBoard } from "./MainPage/components/DashBoard";


function App(){
  const {mode,toggleMode}=useContext(ThemeContext)
  return(
    <ThemeProvider theme={mode==="light"?theme:darkTheme}>
      <Routes>
        <Route path='/' element={<AuthPage></AuthPage>}></Route>
        <Route path='/mainpage' element={<MainPage></MainPage>}></Route>
      </Routes>
      
    </ThemeProvider>
  )
}


export default App 