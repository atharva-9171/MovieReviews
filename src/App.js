import logo from "../src/images/logo.png";
import "./App.css";
import AppRoute from "./routes/router";

function App() {
  return (
    <>
      <head>
        <title>Find Your Movie</title>
        <link rel="icon" type="image/png" href={logo} />
      </head>
      <AppRoute />
    </>
  );
}

export default App;
