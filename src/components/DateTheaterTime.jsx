import React, { useEffect, useState } from "react";
import "../CSS/date_theater_time.css";

import Navbar from "./sub_component/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import DateComponent from "./sub_component/DateComponent";
import TheaterName from "./sub_component/TheaterName";
import TheaterTime from "./sub_component/TheaterTime";
import { api } from "../Central";
import HowManySeat from "./HowManySeat";
import { IoArrowBackSharp } from "react-icons/io5";

const DateTheaterTime = () => {
  const [movie, setMovie] = useState();
  const [theaters, setTheaters] = useState();
  const [error, setError] = useState();
  const [dates, setDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTheater, setSelectedTheater] = useState([]);
  const [showTimeId, setShowTimeId] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [movieName, setMovieName] = useState();

  const { movieid } = useParams();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  //   console.log(movieid);

  const fetchMovieData = async (date) => {
    console.log("api call " + date);

    try {
      const request = await fetch(
        `${api}show-times/${movieid}/by-date?date=${date}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (request.ok) {
        const response = await request.json();
        console.log(response);

        setMovie(response.movie);
        setTheaters(response.theaters);

        console.log(movie);
        console.log(theaters);
      } else {
        console.log("error fetching data");
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

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

  let hours;
  let minutes;

  const totalTime = movie?.duration;
  if (totalTime) {
    hours = Math.floor(totalTime / 60);
    minutes = totalTime % 60;
    console.log(hours, minutes);
  }

  useEffect(() => {
    generateDates();
  }, []);

  useEffect(() => {
    if (movie) {
      setMovieName(movie?.name);
    }
  }, [movie]);

  const handleBack = () => {
    navigate("/movie");
  };

  const handleBookNow = () => {
    setIsVisible(true);
  };

  return (
    <>
      <div className="background">
        <Navbar />

        <div className="container d-flex">
          <div className="w-75 left_div">
            <div className="back">
              <a href onClick={handleBack}>
                <IoArrowBackSharp />
                Back
              </a>
            </div>
            <div className=" my-4 size_6">Date</div>
            <DateComponent
              dates={dates}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              fetchMovieData={fetchMovieData}
            />
            <div className="mt-4 mb-4 size_6">Theater</div>
            <TheaterName
              theaters={theaters}
              setSelectedTheater={setSelectedTheater}
            />
            <div className="mt-4 mb-4 size_6">Time</div>
            <TheaterTime
              selectedTheater={selectedTheater}
              setSelectedTime={setSelectedTime}
              setShowTimeId={setShowTimeId}
            />
            {console.log(showTimeId, "showtimeid")}
          </div>
          {/* <!--  --> */}
          {/* <!--  --> */}

          <div className="w-25 d-flex flex-column right_div">
            <div className="my-2 movie_image">
              <img src={movie?.image} alt={movie?.name} />
            </div>

            <div className=" container  my-2 movie_description">
              <div className="row">
                <div className="col mb-3 size_7 movie_name">{movie?.name}</div>
              </div>
              <div className="row">
                <div className="col mb-1 ms-1 size_3">
                  Movie Description here...
                </div>
              </div>

              <div className="row">
                <div className="col-5 mb-1 ms-1 size_3">Duration</div>
                <div className="col-5 mb-1 size_3">{`${hours}h ${minutes}m`}</div>
              </div>
              <div className="row">
                <div className="col-5 mb-1 ms-1 size_3">Language</div>
                <div className="col-5 mb-1 ms-1 size_3">{movie?.languages}</div>
              </div>
              <div className="row">
                <div className="col-5 mb-1 ms-1 size_3">Type</div>

                <div className="col-5 mb-1 ms-1 size_3">2D</div>
              </div>
            </div>

            <div className="container p-4 mt-2  ticket_description">
              <div className="row">
                <div className="col mb-3 size_6">{selectedTheater[0]}</div>

                <div>
                  <div className="col ps-2 size_10">
                    {new Date(selectedDate).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="col ps-2 size_10">{selectedTime}</div>
                </div>

                <div class>
                  <div className="col mt-3 mb-1 size_3">
                    *seat selection section can be done after this
                  </div>

                  <div className="col ">
                    <button
                      type="button"
                      className=" btn w-100 btn-outline-primary size_1 button"
                      onClick={handleBookNow}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {console.log(
            movieName,
            selectedTime,
            showTimeId,
            selectedDate,
            "movie name |selectedTime | showtimeId |selectedDate"
          )}

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
      </div>
    </>
  );
};

export default DateTheaterTime;
