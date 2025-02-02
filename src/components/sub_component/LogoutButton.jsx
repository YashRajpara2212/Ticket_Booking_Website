import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <>
      <div>
        <button
          onClick={handleLogout}
          className="btn btn-danger my-2 me-2 w-auto logout_button"
          type="submit"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default LogoutButton;
