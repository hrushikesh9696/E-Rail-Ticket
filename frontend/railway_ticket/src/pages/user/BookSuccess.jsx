import React from "react";
import { Link } from "react-router-dom";

const BookSuccess = () => {
  return (
    <div className="container text-center mt-5 p-5">
      <i className="fas fa-check-circle fa-5x text-success"></i>
      <h1>Thank You</h1>
      <h2>Your Ticket Booked Successfully</h2>
      <a href="/" className="btn btn-primary mt-3">
        Home
      </a>
      <Link to="/user/viewTicket" className="btn btn-danger mt-3 ms-2">
        view ticket
      </Link>
    </div>
  );
};

export default BookSuccess;
