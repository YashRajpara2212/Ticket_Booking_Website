import React from "react";
import { useNavigate } from "react-router-dom";

const TheaterMovie = ({
  name,
  languages,
  showTimes,
  setIsVisible,
  setSelectedTime,
  setShowTimeId,
  setMovieName,
 
}) => {
  const navigate = useNavigate();

  const handleMovieInfo = (name, starttime, showtimeId) => {
    // {
    //   console.log(id, name, showtimeId, starttime);
    // }
    setMovieName(name);
    setShowTimeId(showtimeId);
    setSelectedTime(starttime);
    // console.log(startTime);
  };

  const handleBookNow = () => {
    setIsVisible(true);

  };
  return (
    <>
      <div className="d-flex  movie">
        <div className="d-flex flex-column w-75 movie_info">
          <div className=" size_8 movie_title">{name}</div>

          <div className="d-flex ms-1 movie_type">
            <div className="me-2 size_3 lang">{languages}</div>
            <div className="size_3 animation">2D</div>
          </div>

          <div className="ps-1 mb-2 size_3">Time</div>

          <div className="d-flex gap-4 all_movie_time">
            {showTimes.map((showtime) => (
              <div>
                <button
                  className="px-2 border border-secondary w-auto rounded size_3 movie_time"
                  onClick={() =>
                    handleMovieInfo(
                      name,
                      showtime.startTime.slice(12, 19),
                      showtime.id
                    )
                  }
                >
                  {showtime.startTime.slice(12, 19)}
                </button>
              </div>
            ))}
            
          </div>
        </div>
        <div className="w-25 p-3 my-auto d-flex justify-content-end size_1 ">
          <a className="book_now" href onClick={handleBookNow}>
            Book Now
          </a>
        </div>
      </div>
      <hr />
    </>
  );
};

export default TheaterMovie;
