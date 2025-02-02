import React from "react";
import cinemaImage from "../../CSS/cinema.jpg";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/movie");
  };

  const handleTicket = () => {
    navigate("/upcomingmovieticket");
  };

  return (
    <>
      <nav className="navbar d-flex justify-content-between">
        <div>
          <img className="app_logo" src={cinemaImage} alt="cinema logo" />
        </div>

        <div>
          <ul className="d-flex nav justify-content-center">
            <li className="nav-item active">
              <a onClick={handleHome} className="nav-link" href="#">
                Home{" "}
              </a>
            </li>
            <li className="nav-item">
              <a onClick={handleTicket} className="nav-link" href="#">
                My Ticket
              </a>
            </li>
          </ul>
        </div>
        <LogoutButton />
      </nav>
    </>
  );
};

export default Navbar;
