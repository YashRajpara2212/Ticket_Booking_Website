import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HowManySeat = ({ isOpen, onClose, locationState }) => {
  const [noOfSeat, setNoOfSeat] = useState(null);
  const { movieName, selectedTime, showTimeId, selectedDate } =
    locationState || {};

  const navigate = useNavigate();

  const handleNoOfSeat = (seatNumber) => {
    setNoOfSeat(seatNumber);
  };

  // console.log(movieName, selectedTime, showTimeId, selectedDate, "howmanyseat");

  const handleSelectSeat = () => {
    if (noOfSeat) {
      navigate("/selectseat", {
        state: {
          movieName,
          selectedTime,
          showTimeId,
          selectedDate,
          noOfSeat,
        },
      });
    } else {
      alert("please select as seat number");
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={() => onClose(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select no. of Tickets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {Array.from({ length: 10 }, (_, index) => (
            <div className="d-flex col-3" key={index + 1}>
              <Button
                variant={noOfSeat === index + 1 ? "primary" : "outline-primary"}
                className="m-1"
                onClick={() => handleNoOfSeat(index + 1)}
              >
                {index + 1}
              </Button>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex justify-content-between w-75">
            <Button
              variant="secondary"
              className="col-10 ms-4 me-2"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
          </div>
          <div className="d-flex justify-content-between w-75">
            <Button
              variant="primary"
              className="col-10 ms-2 me-4"
              disabled={noOfSeat === null}
              onClick={handleSelectSeat}
            >
              Seat Select
            </Button>
          </div>
        </div>
      </Modal.Footer>
      {console.log(noOfSeat)}
    </Modal>
  );
};

export default HowManySeat;
