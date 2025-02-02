import React, { useEffect, useState } from "react";
import "../CSS/download_ticket.css";
import { useNavigate } from "react-router-dom";
import { api } from "../Central";
import { jsPDF } from "jspdf"; // Import jsPDF

const DownloadTicket = () => {
  const [allTicketsData, setAllTicketsData] = useState();
  const [error, setError] = useState();
  const orderId = localStorage.getItem("orderId");
  const token = localStorage.getItem("authToken");

  console.log(orderId, "orderId");
  const navigate = useNavigate();

  const fetchAllTicketsData = async () => {
    try {
      const request = await fetch(`${api}orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.ok) {
        const response = await request.json();
        console.log(response, "orders1");

        setAllTicketsData(response);
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
    fetchAllTicketsData();
  }, []);

  const formattedDate = new Date(
    allTicketsData?.showtime?.startTime
  ).toString();
  const day = new Date(formattedDate).toString().slice(0, 4);
  const month = new Date(formattedDate).toString().slice(4, 7);
  const year = new Date(formattedDate).toString().slice(11, 16);
  const date = new Date(formattedDate).toString().slice(9, 11);

  const handleHomePage = () => {
    navigate("/movie");
  };

  const handleDownloadTicket = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Movie Ticket", 20, 20);

    doc.setFontSize(12);
    doc.text(`Movie: ${allTicketsData?.showtime?.movie?.name}`, 20, 30);

    doc.text(`Date: ${day}, ${date} ${month} ${year}`, 20, 40);
    doc.text(
      `Time: ${allTicketsData?.showtime?.startTime.slice(12, 19)}`,
      20,
      50
    );

    const seats = allTicketsData?.seatData?.seats
      .map((seat) => `${seat.row}${seat.column}`)
      .join(", ");
    doc.text(`Seats: ${seats}`, 20, 60);

    doc.text(`Total Price: ${allTicketsData?.totalPrice}`, 20, 70);

    doc.setFontSize(8);
    doc.text("Tickets are non-refundable.", 20, 270);

    doc.save("ticket.pdf");
  };

  return (
    <>
      <div className="background">
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
          <div className="d-flex flex-column p-3 m-5 ticket">
            <div className="mb-2">
              <div className="size_1">Date</div>
              <div className="size_11">{`${day}, ${date} ${month} ${year}`}</div>
            </div>

            <div className="mb-3">
              <div className="size_1">Movie Title</div>
              <div className="size_11">
                {allTicketsData?.showtime?.movie?.name}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div className="mb-3 me-3">
                <div className="size_1">
                  Ticket ({allTicketsData?.seatData?.seats.length})
                </div>
                <div className="size_11">
                  {allTicketsData?.seatData?.seats
                    .map((seat) => `${seat.row}${seat.column}`)
                    .join(", ")}
                </div>
              </div>

              <div className="justify-content-end mb-3">
                <div className="size_1">Hours</div>
                <div className="size_11">
                  {allTicketsData?.showtime?.startTime.slice(12, 19)}
                </div>
              </div>
            </div>

            <button
              className="size_1 button1"
              style={{ width: "17vw" }}
              onClick={handleDownloadTicket}
            >
              Download Ticket
            </button>
          </div>
          <div>
            <button
              className="size_12 mt-5 py-1 px-5 button2"
              onClick={handleHomePage}
            >
              Back To Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadTicket;
