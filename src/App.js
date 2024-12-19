import logo from "./logo.svg";
import "./App.css";
import Index from "./pages";
import { BrowserRouter, Router } from "react-router-dom";
import AppRoute from "./routes/router";

function App() {
  return (
    <>
      <AppRoute />
      <title>Find Your Movie</title>
    </>
  );
}

export default App;
