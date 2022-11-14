import Router from "./routes/Router";
import { ThemeProvider } from "@mui/material";
import theme from "./constants/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
