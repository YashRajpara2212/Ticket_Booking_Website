import React from "react";
import "../CSS/payment.css";
const Payment = () => {
  return (
    <>
      <div className="background">
        <div className="container d-flex  justify-content-center align-items-center min-vh-100">
          <div className="container d-flex flex-column px-5  payment">
            <div className=" mt-4 size_6">Payment</div>
            <hr />

            <div className="mb-3">
              <div className="my-1 fw-bold">Pay with:</div>
              <div className="d-flex gap-1">
                <div class>
                  <input type="radio" name="credit_card" />
                </div>
                <div className="size_3" />
                Credit Card
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="my-1 fw-bold">Card Number</div>
            <div className="my-2">
              <input
                className="rounded w-100 p-1 input_border"
                type="text"
                name="card_number"
                placeholder="1234 5678 9101 1121"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <div className="my-1 fw-bold">Expiration Date</div>
              <div className="my-2">
                <input
                  className="rounded input_border"
                  type="number"
                  name="expiration_date"
                  placeholder="MM / YY"
                />
              </div>
            </div>

            <div>
              <div className="my-1 fw-bold">CVV</div>
              <div className="my-2">
                <input
                  className="rounded input_border"
                  type="number"
                  name="cvv"
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <div className="d-flex mb-3">
            <div>
              <input type="checkbox" className="me-2" name="save_card_detail" />
            </div>
            <div className="size_3" style={{ color: "grey" }}>
              {" "}
              Save Card Detail
            </div>
          </div>

          <div className="my-3 ">
            <button className="size_1 button1 w-100 p-2">
              Total Pay
              <i className="fa-solid fa-indian-rupee-sign"></i>
              800
            </button>
          </div>

          <div className="my-3">
            <button className="button2 w-100 size_12 p-2">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
