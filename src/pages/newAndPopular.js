import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import background from "../images/background.jpeg";
import Dropdown from "../components/dropdown";
import Cards from "../components/cards";
import axios from "axios";

export default function Index() {
  const [selectedValue, setSelectedValue] = useState("2024");
  const [movies, SetMovies] = useState([]);
  const [page, SetPage] = useState(1);

  function handleChange(event) {
    setSelectedValue(event.target.value);
    SetPage(1);
  }

  const handleNext = () => {
    SetPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    async function Api() {
      let url = "https://omdbapi.com/?apikey=4e9e8ed7&s=";
      let type = "movie&y=";
      let api = await axios.get(url + type + selectedValue + `&page=${page}`);
      SetMovies(api.data.Search);
      console.log(api.data.Search);
    }
    Api();
  }, [selectedValue, page]);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <div>
        <Navbar />

        <h1 style={{ color: "white", paddingTop: "75px", paddingLeft: "75px" }}>
          Popular Series of {selectedValue}
        </h1>
        <h4 style={{ color: "white", paddingLeft: "75px", paddingTop: "10px" }}>
          Select Year
        </h4>
        <Dropdown
          selectedValue={selectedValue}
          SetSelectedVlaue={handleChange}
        />
        <div
          style={{
            display: "flex",
            alignContent: "space-between",
            flexWrap: "wrap",
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          {movies.map((d) => {
            return <Cards data={d} />;
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          paddingBottom: "20px",
          paddingLeft: "50px",
          justifyContent: "space-between",
          paddingRight: "50px",
        }}
      >
        <button
          onClick={() => SetPage(page - 1)}
          disabled={page <= 1}
          style={{
            backgroundColor: "grey",
            width: "175px",
            height: "50px",
            color: "black",
            fontWeight: "bolder",
          }}
        >
          Previous Page
        </button>
        <p></p>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "grey",
            color: "black",
            fontWeight: "bolder",
            width: "175px",
            height: "50px",
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
