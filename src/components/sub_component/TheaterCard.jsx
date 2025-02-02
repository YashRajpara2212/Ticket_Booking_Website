import React from "react";
import { CiLocationOn } from "react-icons/ci";
import "../../CSS/theater_page.css";
import { useNavigate } from "react-router-dom";
const TheaterCard = ({ theaterName, theaterId, address }) => {
  const navigate = useNavigate();
  let theaterid = theaterId;

  const handleTheaterTimeTable = () => {
    navigate(`/theaterpage/${theaterid}`);
  };

  return (
    <>
      <div className="m-2 theater_card">
        <button
          type="button"
          className="btn btn-outline-secondary w-100 text-start button_hover"
          onClick={handleTheaterTimeTable}
        >
          <div className="m-1 size_8"> {theaterName}</div>

          <div className="m-1 size_3">
            <CiLocationOn /> {address}
          </div>
        </button>
      </div>
    </>
  );
};

export default TheaterCard;
