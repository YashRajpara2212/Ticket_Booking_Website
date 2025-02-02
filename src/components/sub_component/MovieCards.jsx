import React from "react";
import "../../CSS/movie_page.css";
import { useNavigate } from "react-router-dom";

const MovieCards = (props) => {
  const movieid = props.id;
  const navigate = useNavigate();

  const handleDataTheaterTime = () => {
    navigate(`/movie/${movieid}`);
  };
  //   console.log(props);
  return (
    <>
      <div className="me-3  movie_card" onClick={handleDataTheaterTime}>
        <div>
          <img className=" my-2" src={props.img} alt={props.title} />
        </div>

        <div>
          <h3>{props.title}</h3>
        </div>
      </div>
    </>
  );
};

export default MovieCards;
