import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#fff",
      main: "#01579b",
      dark: "#2d2727",
      blue: "#1178ee", //blue
      contrastText: "#666666",
    },
    secondary: {
      light: "#9fffe0",
      main: "#69f0ae",
      dark: "#2bbd7e",
      contrastText: "#000",
    },
    openTitle: "#333333", // dark color
    backgroundGradient: "linear-gradient(-135deg, #fa09ea, #4158d0)",
    protectedTitle: "#2bbd7e",
    type: "light",
  },
});

export default theme;
