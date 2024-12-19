import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "../pages/index";
import Movies from "../pages/movies";
import NewAndPopular from "../pages/newAndPopular";
import TvShows from "../pages/tvShows";

function AppRoute(props) {
  return (
    <Router {...props}>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="movies" element={<Movies />} />
        <Route path="newandpopular" element={<NewAndPopular />} />
        <Route path="tvshows" element={<TvShows />} />
      </Routes>
    </Router>
  );
}

export default AppRoute;
/*import React from "react";
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function AppRoute(props) {
    return (
      <Router {...props}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          
            <Route path="contact" element={<Contact />} />
          
        </Routes>
      </Router>
    );
  }
  export default AppRoute; */
