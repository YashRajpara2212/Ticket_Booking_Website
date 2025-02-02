import React, { useEffect, useState } from "react";
import "../CSS/history.css";
import Navbar from "./sub_component/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../Central";
import jsPDF from "jspdf";

const History = () => {
  const [ticketsData, setTicketsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchTicketsData = async () => {
      try {
        const request = await fetch(`${api}orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await request.json();
        if (request.ok) {
          const currentDateTime = new Date();
          const filteredOrders = response.filter((order) => {
            const showtime = order.showtime;
            if (order.status !== "COMPLETED") {
              return false;
            }

            const orderStartTime = new Date(showtime?.startTime);
            return orderStartTime < currentDateTime;
          });

          setTicketsData(filteredOrders);
        } else {
          throw new Error("Failed to fetch ticket data");
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchTicketsData();
  }, []);

  const handleUpcoming = () => {
    navigate("/upcomingmovieticket");
  };

  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();

    const formattedDate = formatDate(ticket.showtime.startTime);
    const movieTitle = ticket.showtime.movie.name;
    const seats = ticket.seatData.seats
      .map((seat) => `${seat.row}${seat.column}`)
      .join(", ");
    const showtime = new Date(ticket.showtime.startTime).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    const totalPrice = ticket.totalPrice;

    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("Movie Ticket", 20, 20);

    doc.setFontSize(12);
    doc.text(`Movie: ${movieTitle}`, 20, 40);
    doc.text(`Date: ${formattedDate}`, 20, 50);
    doc.text(`Time: ${showtime}`, 20, 60);
    doc.text(`Seats: ${seats}`, 20, 70);
    doc.text(`Total Price: ${totalPrice}`, 20, 80);

    // Save the PDF file
    doc.save(`${movieTitle}_ticket.pdf`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-us", { weekday: "short" });
    const month = date.toLocaleString("en-us", { month: "short" });
    const year = date.getFullYear();
    const dateNum = date.getDate();
    return `${day}, ${dateNum} ${month} ${year}`;
  };

  return (
    <>
      <div className="background">
        <Navbar />

        <div className="container">
          <div className="d-flex ">
            <button
              className="m-2   rounded size1"
              style={{ width: "10vw" }}
              onClick={handleUpcoming}
            >
              Upcoming
            </button>
            <button
              className="m-2  rounded  size1"
              style={{
                backgroundColor: "#005c99",
                color: "#ffffff",
                width: "10vw",
              }}
            >
              History
            </button>
          </div>

          <div className="container d-flex flex-wrap mt-3 ">
            {error && <div className="alert alert-danger">{error}</div>}{" "}
            {ticketsData.map((ticket) => (
              <div
                key={ticket.id}
                className="d-flex flex-column p-3 m-3 ticket"
              >
                <div className="d-flex flex-column mb-2 ">
                  <div className="size_1">Date </div>
                  <div className="size_11">
                    {formatDate(ticket.showtime.startTime)}
                  </div>
                </div>

                <div className="d-flex flex-column mb-3">
                  <div className="size_1">Movie Title</div>
                  <div className="size_11">{ticket.showtime.movie.name}</div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column mb-3 me-3">
                    <div className="size_1">
                      Ticket ({ticket.seatData.seats.length})
                    </div>
                    <div className="size_11">
                      {ticket.seatData.seats
                        .map((seat) => `${seat.row}${seat.column}`)
                        .join(", ")}
                    </div>
                  </div>

                  <div className="d-flex flex-column justify-content-end mb-3">
                    <div className="size_1">Hours</div>
                    <div className="size_11">
                      {new Date(ticket.showtime.startTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <button
                    className=" rounded size_1"
                    onClick={() => handleDownloadTicket(ticket)}
                  >
                    Download Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
