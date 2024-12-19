import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import CardsM from "../components/cardMovies";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setShowSearchModal(true);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=4e9e8ed7&s=${searchQuery}`
      );
      if (response.data.Search) {
        setSearchResults(response.data.Search);
      } else {
        setError("No results found.");
      }
    } catch (err) {
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSearchModal = () => {
    setShowSearchModal(false);
    setSearchResults([]);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="Brand Logo" className="brand-logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tvshows">
                  TV Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/newandpopular">
                  New & Popular
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <Modal
        show={showSearchModal}
        onHide={handleCloseSearchModal}
        centered
        dialogClassName="larger-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body className="no-scroll-modal-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : searchResults.length > 0 ? (
            <div className="row g-4 flex-nowrap">
              {" "}
              {/* Single row layout for cards */}
              {searchResults.map((result) => (
                <div className="col-12" key={result.imdbID}>
                  <CardsM data={result} />
                </div>
              ))}
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseSearchModal}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
