import React, { useState, useEffect } from "react";

import "../CSS/theater_page.css";
import TheaterCard from "./sub_component/TheaterCard";
import Navbar from "./sub_component/Navbar";
import { useNavigate } from "react-router-dom";
import { api } from "../Central";

const TheaterPage = () => {
  const [theaters, setTheaters] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const fetchTheatersData = async () => {
    try {
      const request = await fetch(api + "theaters", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (request.ok) {
        const response = await request.json();
        console.log(response);

        setTheaters(response.data);
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
    fetchTheatersData();
  }, []);

  const handleMovie = () => {
    navigate("/movie");
  };

  return (
    <>
      <div className="background">
        <Navbar />

        <div className="container">
          <div className="m-2 size_5"> Now Showing</div>

          <div className="d-flex movie_theater_div">
            <div className="me-4">
              <button
                className="my-2 movie_theater btn size_1"
                onClick={handleMovie}
              >
                Movie
              </button>
            </div>
            <div>
              <button
                className="my-2 btn movie_theater size_1"
                style={{
                  backgroundColor: "#005c99",
                  color: "#ffffff",
                  width: "10vw",
                }}
              >
                Theater
              </button>
            </div>
          </div>

          <div className="d-flex flex-column  all_theater">
            {theaters &&
              theaters.map((theater) => (
                <TheaterCard
                  key={theater.id}
                  theaterId={theater.id}
                  theaterName={theater.name}
                  address={theater.location}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TheaterPage;
