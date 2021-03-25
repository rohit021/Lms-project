import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from "@material-ui/core";
import { LayoutProvider } from "./context/LayoutContext";
import theme from './theme'
import "./App.css";

const App = () => {
  return (
  <LayoutProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter/>
      </ThemeProvider>
    </BrowserRouter>
  </LayoutProvider>    
  );
};

export default App;
