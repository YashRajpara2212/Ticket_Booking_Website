import React, { useEffect, useState } from "react";
import "../CSS/movie_page.css";
import { useNavigate } from "react-router-dom";
import aloneImage from "../CSS/alone.png";

import cinemaImage from "../CSS/cinema.jpg";
import { api } from "../Central";
import MovieCards from "./sub_component/MovieCards";
import Navbar from "./sub_component/Navbar";

const MoviePage = () => {
  const [movies, setMovies] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const fetchMoviesData = async () => {
    try {
      const request = await fetch(api + "movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.ok) {
        const response = await request.json();
        console.log(response);

        setMovies(response);
      } else {
        console.log("error fetching data");
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);

  

  const handleTheater = () => {
    navigate("/theaterpage");
  };

  return (
    <>
      {token ? (
        <div className="background">
          <Navbar />

          <div className="container">
            <div className="m-2  size_5 "> Now Showing</div>

            <div className=" d-flex movie_theater_div">
              <div className="my-2 me-4">
                <button
                  className="btn movie_theater size_1"
                  style={{
                    backgroundColor: "#005c99",
                    color: "#ffffff",
                    width: "10vw",
                  }}
                >
                  Movie
                </button>
              </div>
              <div className="my-2">
                <button
                  className="btn movie_theater size_1"
                  onClick={handleTheater}
                >
                  Theater
                </button>
              </div>
            </div>

            <div className="ms-2  all_movie_card">
              {movies &&
                movies.map((movie) => (
                  <MovieCards
                    key={movie.id}
                    id={movie.id}
                    img={movie.image}
                    title={movie.name}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1> unAuthorized Access</h1>
        </div>
      )}
    </>
  );
};

export default MoviePage;
