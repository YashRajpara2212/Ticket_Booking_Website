import React from "react";

const TheaterTime = ({ selectedTheater, setSelectedTime, setShowTimeId }) => {
  return (
    <>
      <div className="d-flex flex-wrap all_time">
        {selectedTheater[1] &&
          selectedTheater[1].map((time) => (
            <div className="m-2  size_3">
              <button
                type="button"
                className="btn btn-outline-secondary w-auto time"
                onClick={() => {
                  setSelectedTime(time.startTime.slice(12, 19));
                  setShowTimeId(time.showTimeId);
                }}
              >
                {time.startTime.slice(12, 19)}
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default TheaterTime;
