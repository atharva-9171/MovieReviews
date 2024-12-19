import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./card.css";

export default function CardM(props) {
  const [showModal, setShowModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // State to track button color

  // Function to handle opening the modal and fetching movie data
  const handleShowModal = async () => {
    setShowModal(true);
    await fetchMovieDetails(props.data.imdbID); // Fetch movie details when modal is opened
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to fetch movie details from OMDB API
  const fetchMovieDetails = async (imdbID) => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await axios.get(
        `https://omdbapi.com/?apikey=4e9e8ed7&i=${imdbID}`
      );
      setMovieDetails(response.data); // Store the movie details in state
    } catch (err) {
      setError("Failed to fetch movie details.");
    } finally {
      setLoading(false); // Stop loading once the API request is complete
    }
  };

  // Function to handle the like button click
  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle the liked state
  };

  return (
    <>
      {/* Card Button */}
      <div style={{ padding: "50px", borderColor: "transparent" }}>
        <div className="card">
          <button
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              border: "0px",
              color: "transparent",
            }}
            onClick={handleShowModal}
          >
            <img
              src={props.data.Poster}
              alt={props.data.Title}
              style={{ width: "100%" }}
            />
            <div className="container">
              <h4>
                <b>{props.data.Title}</b>
              </h4>
              <p>{props.data.Year}</p>
            </div>
          </button>
          <center>
            <button
              className="likeButton"
              style={{
                height: "35px",
                width: "75px",
                border: "none",
                borderColor: "transparent",
                backgroundColor: isLiked ? "red" : "black", // Dynamic background color
                color: "white",
                cursor: "pointer",
                fontFamily: "cursive",
              }}
              onClick={handleLikeClick} // Handle like button click
            >
              {isLiked ? "Liked" : "Like"}
            </button>
          </center>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ userSelect: "none" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.data.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <p>
                <b>Year:</b> {movieDetails?.Year}
              </p>
              <p>
                <b>Genre:</b> {movieDetails?.Genre}
              </p>
              <p>
                <b>Director:</b> {movieDetails?.Director}
              </p>
              <p>
                <b>Plot:</b> {movieDetails?.Plot}
              </p>
              <p>
                <b>IMDB Rating:</b> {movieDetails?.imdbRating}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
