import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6750A4", // M3 Purple
    },
    secondary: {
      main: "#625B71",
    },
    error: {
      main: "#B3261E",
    },
    background: {
      default: "#FFFBFE",
      paper: "#FFFBFE",
    },
  },
  shape: {
    borderRadius: 16, // More rounded for M3
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)", // M3 elevation 1
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        },
      },
    },
  },
});

export default theme;
