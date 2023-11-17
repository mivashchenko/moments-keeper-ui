import ReactDOM from "react-dom/client";

import { router } from "./App";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import "./index.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { grey, common } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...grey,
      ...(mode === "dark" && {
        main: grey[300],
      }),
    },
    ...(mode === "dark"
      ? {
          background: {
            default: "hsl(232, 11%, 15%)",
            paper: "hsl(233, 8%, 19%)",
          },
        }
      : {
          background: {
            default: "hsl(0, 0%, 100%)",
            paper: "hsl(0, 0%, 100%)",
          },
        }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: common["white"],
            secondary: common["white"],
          }),
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(6px)",
          boxShadow:
            "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075), 0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)",
          aspectRatio: "1/1",
          borderRadius: "12px",
        },
      },
    },
  },
});

const darkModeTheme = createTheme(getDesignTokens("light"));

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  </ReduxProvider>,
);
