import React from "react";
import "../CSS/payment_success.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleViewTicket = () => {
    navigate("/downloadticket");
  };
  const handleHomepage = () => {
    navigate("/movie");
  };
  return (
    <>
      <div className="background">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="container d-flex flex-column px-5 payment_success">
            <div className="my-4 size_14 d-flex align-items-center justify-content-center ">
              Payment Successful
            </div>

            <div className="my-4 fs-1  d-flex align-items-center justify-content-center ">
              <FaRegCheckCircle />
            </div>

            <div className="d-flex justify-content-center align-items-center my-3">
              <button
                className=" button1 w-50 size_1 p-2"
                onClick={handleViewTicket}
              >
                View Ticket
              </button>
            </div>

            <div className="d-flex justify-content-center align-items-center my-3">
              <button
                className=" button2 w-50 size_12 p-2"
                onClick={handleHomepage}
              >
                Back to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
