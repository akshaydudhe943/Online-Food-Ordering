import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./Component/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Component/Theme/DarkTheme";
import { Home } from "./Component/Home/Home";
import { RestaurantDetails } from "./Component/Restaurant/RestaurantDetails";
import { Cart } from "./Component/Cart/Cart";
import { Profile } from "./Component/Profile/Profile";
import { CustomerRoute } from "./Routers/CustomerRoute";
import { Auth } from "./Component/Auth/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Authentication/Action";
import { store } from "./State/store";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
  }, [auth.jwt]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomerRoute />
    </ThemeProvider>
  );
}

export default App;
