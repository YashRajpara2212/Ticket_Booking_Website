import React, { useState } from "react";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";
import "../CSS/booking_detail.css";
import { api } from "../Central";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";

const BookingDetail = () => {
  const [orderData, setOrderData] = useState();
  const [error, setError] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedSeats,
    movieName,
    selectedTime,
    showTimeId,
    selectedDate,
    noOfSeat,
    totalPrice,
  } = location.state || {};

  const serviceCharge = Math.floor(0.06 * totalPrice);
  const formattedDate = new Date(selectedDate).toString();
  const day = new Date(selectedDate).toString().slice(0, 4);
  const month = new Date(selectedDate).toString().slice(4, 7);
  const year = new Date(selectedDate).toString().slice(11, 16);
  const date = new Date(selectedDate).toString().slice(9, 11);

  const token = localStorage.getItem("authToken");

  const handleBack = () => {
    navigate("/movie");
  };
  const seatData = selectedSeats?.seats || [];
  const handlePayment = async () => {
    try {
      const cleanedSeats = selectedSeats.map((seat) => {
        const { row, column, layoutType } = seat;
        return { row, column, layoutType };
      });

      const orderPayload = {
        showtimeId: showTimeId,
        seatData: {
          seats: cleanedSeats,
        },
      };
      console.log(orderPayload, "hi");

      const request = await fetch(`${api}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (request.ok) {
        const response = await request.json();
        console.log(response);

        setOrderData(response);

        localStorage.setItem("orderId", response.orderId);

        if (response.paymentUrl) {
          window.location.href = response.paymentUrl;
        }
      } else {
        const errorResponse = await request.json();
        console.log("Error:", errorResponse);
        throw new Error(`Failed to fetch data: ${errorResponse.message}`);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const seatDisplay = selectedSeats
    ? selectedSeats.map((seat) => `${seat.row}${seat.column}`).join(", ")
    : "";

  return (
    <>
      <div className="background">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="container d-flex flex-column mt-4 mx-4 px-4 w-25 booking_detail">
            <div className="mt-2 mb-3 size_6">Booking Detail</div>

            <div className="mb-2">
              <div className="mb-1 size_13">Movie Title</div>
              <div className="mb-1 text-muted fs-4 size_14">{movieName}</div>
            </div>

            <div className="mb-2">
              <div className="mb-1 size_13">Date</div>
              <div className="mb-1 text-muted fs-4 size_14">{`${day}, ${date} ${month} ${year}`}</div>
            </div>

            <div className="mb-3 d-flex justify-content-between">
              <div>
                <div className="mb-1 size_13">
                  Ticket ({selectedSeats.length})
                </div>
                <div className="mb-1 text-muted fs-4 size_14">
                  {seatDisplay}
                </div>
              </div>

              <div>
                <div className="mb-1 size_13">Time</div>
                <div className="mb-1  text-muted fs-4 size_14">
                  {selectedTime}
                </div>
              </div>
            </div>

            <div className="mb-2 size_1">Transaction Detail</div>

            <div>
              <div className="d-flex justify-content-between">
                <div className="size_13">Total Seat Cost</div>
                <div className="size_13">
                  <FaIndianRupeeSign />
                  {totalPrice}
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="size_13">Service Charge (6%)</div>
                <div className="size_13">
                  <FaIndianRupeeSign />
                  {serviceCharge}
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-5">
                <div className="size_13">Total payment</div>
                <div className="size_13">
                  <FaIndianRupeeSign />
                  {totalPrice + serviceCharge}
                </div>
              </div>
            </div>

            <div
              className="mb-3"
              style={{ color: "#cccccc", fontsize: "12px" }}
            >
              *Purchased tickets cannot be canceled.
            </div>

            <div className="mb-3">
              <button
                className="p-2 w-100 size_1 button1"
                onClick={handlePayment}
              >
                Total Pay <FaIndianRupeeSign />
                {totalPrice + serviceCharge}
                Proceed
              </button>
            </div>

            <div className="mb-3 p-2">
              <button
                className="p-2 w-100 size_12 button2"
                onClick={handleBack}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
