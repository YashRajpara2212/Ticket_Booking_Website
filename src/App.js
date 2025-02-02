import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DateTheaterTime from "./components/DateTheaterTime";
import Login from "./components/Login";
import BookingDetail from "./components/BookingDetail";
import SignUpPage from "./components/SignUpPage";
import DownloadTicket from "./components/DownloadTicket";
import History from "./components/History";
import HowManySeat from "./components/HowManySeat";
import MoviePage from "./components/MoviePage";
import PaymentSuccess from "./components/PaymentSuccess";
import Payment from "./components/Payment";
import TheaterPage from "./components/TheaterPage";
import Upcoming from "./components/Upcoming";
import TheaterTimeTable from "./components/TheaterTimeTable";
import SelectSeat from "./components/SelectSeat";
import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import { AuthContext } from "./AuthContext";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/signuppage" element={<SignUpPage />} />

          <Route path="/movie" element={<MoviePage />} />
          <Route path="/movie/:movieid" element={<DateTheaterTime />} />

          <Route path="/theaterpage" element={<TheaterPage />} />
          <Route
            path="/theaterpage/:theaterid"
            element={<TheaterTimeTable />}
          />

          <Route path="/selectseat" element={<SelectSeat />} />
          <Route path="/selectseat/bookingdetail" element={<BookingDetail />} />
          <Route
            path="/selectseat/bookingdetail/payment"
            element={<Payment />}
          />

          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/downloadticket" element={<DownloadTicket />} />
          <Route path="/upcomingmovieticket" element={<Upcoming />} />
          <Route path="/historymovieticket" element={<History />} />
        </Routes>
      </BrowserRouter>
      {/* </AuthContext.Provider> */}
      {/* <Login/> */}
      {/* <SignUpPage /> */}

      {/* <BookingDetail/> */}
      {/* <DateTheaterTime/> */}
      {/* <DownloadTicket/> */}
      {/* <History/> */}
      {/* <HowManySeat /> */}
      {/* <MoviePage/> */}
      {/* <PaymentSuccess/> */}
      {/* <Payment/> */}
      {/* <TheaterPage/> */}
      {/* <Upcoming/> */}
      {/* <TheaterTimeTable/> */}
      {/* <SelectSeat/> */}
    </>
  );
}

export default App;
