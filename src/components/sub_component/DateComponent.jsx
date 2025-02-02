import React, { useState, useEffect } from "react";
import "../../CSS/date_theater_time.css";

const DateComponent = ({ dates, setSelectedDate, fetchMovieData }) => {
  
  // console.log(DateList);

  return (
    <>
      <div className="d-flex gap-3 flex-wrap all_date_day ">
        {dates &&
          dates.map((date, index) => (
            <div className=" ">
              <button
                type="button"
                className="btn m-auto p-auto btn-outline-secondary w-auto button"
                onClick={() => {
                  setSelectedDate(date);
                  fetchMovieData(date);
                }}
              >
                <div>
                  {new Date(date).toLocaleString("en-US", {
                    day: "numeric",
                  })}{" "}
                  {new Date(date).toLocaleString("en-US", {
                    month: "short",
                  })}
                </div>

                <div className="fw-bold">
                  {new Date(date).toLocaleString("en-US", {
                    weekday: "short",
                  })}
                </div>
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default DateComponent;
