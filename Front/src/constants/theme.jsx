import { createTheme } from "@mui/material";
import { primaryColor, neutralColor, secundaryColor } from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "white",
    },
    secondary: {
      main: secundaryColor,
    },
  },
});

export default theme;
