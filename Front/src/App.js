import axios from "axios";
import { useEffect, useState } from "react";
import Router from "./routes/Router";
import { ThemeProvider } from "@mui/material";
import theme from "./constants/theme";

const App = () => {
  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
