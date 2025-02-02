import React, { useEffect, useState } from "react";
import "../CSS/theater_timetable.css";

import { CiLocationOn } from "react-icons/ci";

import Navbar from "./sub_component/Navbar";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../Central";
import DateComponent from "./sub_component/DateComponent";
import TheaterMovie from "./sub_component/TheaterMovie";
import HowManySeat from "./HowManySeat";

const TheaterTimeTable = () => {
  const [theaterMovies, setTheaterMovies] = useState();
  const [theater, setTheater] = useState();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [showTimeId, setShowTimeId] = useState();
  const [movieName, setMovieName] = useState();
 

  const [error, setError] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { theaterid } = useParams();

  const fetchTheaterNameId = async () => {
    try {
      const request = await fetch(`${api}theaters/${theaterid}/movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (request.ok) {
        const response = await request.json();
        console.log(response, "first response");
        setTheater(response.data);
      } else {
        console.log("error fetching data");
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const fetchMovieData = async (date) => {
    try {
      const request = await fetch(
        `${api}theaters/${theaterid}/shows?date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (request.ok) {
        const response = await request.json();
        console.log(response, "second response");
        setTheaterMovies(response.data);
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
    generateDates();
    fetchTheaterNameId();
  }, []);

  const generateDates = () => {
    const today = new Date();

    const next6Days = [];
    for (let i = 0; i < 6; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      next6Days.push(newDate);
    }
    setDates(next6Days);
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="background">
        <Navbar />

        <div className="container">
          <div className="d-flex mb-4">
            <div className="fs-1">
              <a onClick={handleBack} className="arrow " href>
                <MdKeyboardBackspace />{" "}
              </a>
            </div>

            <div className=" d-flex flex-column theater_address">
              <div className="m-2 size_5">{theater?.name}</div>

              <div className="m-2 size_3">
                <CiLocationOn />
                {theater?.location}
              </div>
            </div>
          </div>

          {/* <!-- date & day  --> */}
          <DateComponent
            dates={dates}
            setSelectedDate={setSelectedDate}
            fetchMovieData={fetchMovieData}
          />

          {/* <!--  -->
            <!-- movie section --> */}

          <hr />

          <div className="d-flex flex-column all_movie">
            {theaterMovies &&
              theaterMovies.map((theaterMovie) => (
                <TheaterMovie
                  key={theaterMovie.id}
                  name={theaterMovie.name}
                  languages={theaterMovie.languages}
                  showTimes={theaterMovie.showTimes}
                  setIsVisible={setIsVisible}
                  setSelectedTime={setSelectedTime}
                  setShowTimeId={setShowTimeId}
                  setMovieName={setMovieName}
                  
                />
              ))}
          </div>
        </div>
        {console.log(movieName, selectedTime, showTimeId, selectedDate)}
        <HowManySeat
          isOpen={isVisible}
          onClose={setIsVisible}
          locationState={{
            movieName,
            selectedTime,
            showTimeId,
            selectedDate,
            
          }}
        />
      </div>
    </>
  );
};

export default TheaterTimeTable;
