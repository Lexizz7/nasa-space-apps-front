import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";

import "./index.css";

let theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#251D3A",
      paper: "#2A2550",
    },
    primary: {
      light: "#FF9233",
      main: "#FF7700",
      dark: "#E04D01",
    },
    secondary: {
      light: "#89D2A1",
      main: "#5CC17E",
      dark: "#3EA35F",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  shape: {
    borderRadius: 8,
  },
});

theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Erro!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
