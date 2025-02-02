import React, { useEffect, useState } from "react";
import "../CSS/select_seat.css";
import { api } from "../Central";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const SelectSeat = () => {
  const token = localStorage.getItem("authToken");
  const [showsdata, setShowsData] = useState();
  const [error, setError] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const location = useLocation();
  const navigate = useNavigate(); 

  const { movieName, selectedTime, showTimeId, selectedDate, noOfSeat } =
    location.state || {};

  const fetchScreenLayout = async () => {
    try {
      const request = await fetch(`${api}show-times/${showTimeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.ok) {
        const response = await request.json();
        setShowsData(response.data);
      } else {
        console.log("error fetching data");
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScreenLayout();
  }, []);

  const price = showsdata?.price;
  const layout = showsdata?.screen.layout
    ? JSON.parse(showsdata?.screen.layout)
    : [];
  const orders = showsdata?.orders || [];

  const bookedSeats = orders.flatMap((order) =>
    order.seatData.seats.map((seat) => `${seat.row}${seat.column}`)
  );

  const handleSeatClick = (row, column) => {
    const seatId = `${row}${column}`;
    let updatedSeats = [...selectedSeats];
    let updatedTotalAmount = totalPrice;

    // Helper function to find the layout type for a specific seat
    const findLayoutType = (row, column) => {
      let layoutType = "";
      layout.forEach((layoutItem) => {
        if (layoutItem.layout.rows.includes(row)) {
          layoutType = layoutItem.type; // Assign the correct layoutType
        }
      });
      return layoutType;
    };

    // Prevent selecting more seats than the specified number
    if (
      updatedSeats.length >= noOfSeat &&
      !updatedSeats.some((s) => s.row === row && s.column === column)
    ) {
      alert(`You can only select up to ${noOfSeat} seats.`);
      return;
    }

    if (bookedSeats.includes(seatId)) {
      alert("This seat is already booked.");
      return;
    }

    // Check if seat is already selected
    const seatAlreadySelected = updatedSeats.some(
      (s) => s.row === row && s.column === column
    );

    const layoutType = findLayoutType(row, column); // Find the layout type for this seat
    const priceOption = price.find(
      (option) => option.layoutType === layoutType
    );
    const seatPrice = priceOption ? priceOption.price : 0;

    if (seatAlreadySelected) {
      // Remove the seat if it was already selected
      updatedSeats = updatedSeats.filter(
        (s) => !(s.row === row && s.column === column)
      );
      updatedTotalAmount -= seatPrice; // Decrease the price
    } else {
      // Add the seat if it's not already selected
      updatedSeats.push({ row, column, layoutType, price: seatPrice });
      updatedTotalAmount += seatPrice; // Increase the price
    }

    setSelectedSeats(updatedSeats);
    setTotalPrice(updatedTotalAmount);
  };

  const handleProceedToPayment = () => {
    // Prepare seatData in the desired format (without price)
    const seatData = selectedSeats.map((seat) => {
      const { row, column, layoutType } = seat;

      return {
        row,
        column,
        layoutType, // Only include row, column, and layoutType (no price)
      };
    });

    // Proceed to the next page with the selected seats and total price
    navigate("/selectseat/bookingdetail", {
      state: {
        selectedSeats: seatData, // Pass the seat data with correct layoutType (no price)
        movieName,
        selectedTime,
        showTimeId,
        selectedDate,
        noOfSeat,
        totalPrice, // Send the total price that has been updated dynamically
      },
    });
  };

  const handleBack = () => {
    navigate("/movie");
  };

  return (
    <div className="background">
      <div className="container pt-5">
        <div className="d-flex">
          <div>
            <a className="fs-1 arrow" href="#" onClick={handleBack}>
              <MdKeyboardBackspace />
            </a>
          </div>
          <div className="m-2 size_5">Select Seat</div>
        </div>

        <div className="container mt-5 d-flex flex-column w-50 justify-content-center select_seat">
          {/* Display Price */}
          {price?.map((priceOption, index) => (
            <div key={index}>
              <div className="align-items-start size_3">
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {priceOption.price} {priceOption.layoutType}
              </div>
              <div className="w-100 mb-2 div_border"></div>

              {layout?.map(
                (layoutItem, idx) =>
                  layoutItem.type === priceOption.layoutType && (
                    <div key={idx}>
                      {layoutItem.layout.rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="mt-2 d-flex">
                          {Array.from({
                            length: layoutItem.layout.columns[1],
                          }).map((_, colIndex) => {
                            const seatId = `${row}${colIndex + 1}`;
                            const isBooked = bookedSeats.includes(seatId);
                            const isSelected = selectedSeats.some(
                              (seat) =>
                                seat.row === row && seat.column === colIndex + 1
                            );
                            return (
                              <div key={colIndex}>
                                <button
                                  className={`button1 size_3 mx-2 py-2 px-auto seat_no ${
                                    isBooked
                                      ? "btn-secondary"
                                      : isSelected
                                      ? "btn-success" // Selected seat color
                                      : ""
                                  }`}
                                  disabled={isBooked}
                                  onClick={() =>
                                    handleSeatClick(row, colIndex + 1)
                                  }
                                >
                                  {seatId}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          ))}

          <div className="screen"></div>

          <div className="d-flex justify-content-center align-items-center size_3">
            All eyes this way please!
          </div>

          <div className="m-5 d-flex justify-content-center align-items-center">
            <button
              className="button1 size_1 w-50"
              onClick={handleProceedToPayment}
              disabled={selectedSeats.length !== noOfSeat} // Only allow proceeding if the correct number of seats is selected
            >
              Proceed to Payment{" "}
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {totalPrice} {/* Dynamically display the total price */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeat;
