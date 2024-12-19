import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import background from "../images/background.jpeg";
import Dropdown from "../components/dropdown";
import Cards from "../components/cards";
import axios from "axios";

export default function Index() {
  const [selectedValue, setSelectedValue] = useState("2024");
  const [movies, SetMovies] = useState([]);

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }
  useEffect(() => {
    async function Api() {
      let url = "https://omdbapi.com/?apikey=4e9e8ed7&s=";
      let type = "movie&y=";
      let api = await axios.get(url + type + selectedValue);
      SetMovies(api.data.Search);
      console.log(api.data.Search);
    }
    Api();
  }, [selectedValue]);
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
          Movies Relesed in {selectedValue}
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
          {movies
            .filter((movies) => movies.Year === selectedValue)
            .map((d) => {
              return <Cards data={d} />;
            })}
          {/* {movies.map((d) => {
            return <Cards data={d} />;
          })} */}
        </div>
      </div>
    </div>
  );
}
