import React from "react";
import { CiLocationOn } from "react-icons/ci";
const TheaterName = ({ theaters, setSelectedTheater }) => {
  return (
    <>
      <div className="d-flex flex-wrap all_theater_name">
        {theaters &&
          theaters.map((theater) => (
            <div className="m-2 theater_name size_3 ">
              <button
                type="button"
                className="btn btn-outline-secondary w-auto button "
                onClick={() => {
                  setSelectedTheater([theater.name, theater.showtimes]);
                  // console.log(theater.showtimes);
                }}
              >
                <CiLocationOn />
                {theater.name}
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default TheaterName;
