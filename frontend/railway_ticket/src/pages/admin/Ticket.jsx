import React, { useEffect, useState } from "react";
import trainService from "../../service/train.service";

const Ticket = () => {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    trainService
      .getAllTicket()
      .then((res) => {
        setTicket(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="card mt-3">
        <div className="card-header text-center fs-4"> Train Ticket</div>
        <div className="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Sl No</th>
                <th scope="col">Train No</th>
                <th scope="col">Train Name</th>
                <th scope="col">Place</th>
                <th scope="col">Traveller Details</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {ticket.map((t, num) => (
                <tr>
                  <th scope="row">{num + 1}</th>

                  <td>{t.train.trainNumber}</td>
                  <td>{t.train.trainName}</td>
                  <td>
                    {t.train.source}-{t.train.destination}
                  </td>
                  <td>
                    Name : {t.travellerName} <br />
                    Age:{t.age} , Gender:{t.gender} <br />
                    Email:{t.email},Mob No : {t.mobNo}
                  </td>
                  <td>{t.train.price}</td>
                  <td>
                  Payment: <span className=" text-success fw-bold">{t.paymentStatus}</span> <br/>
                  Ticket :  {t.ticketStatus === "Booked" && (
                              <span className=" text-success fw-bold">
                                {" "}
                                {t.ticketStatus}
                              </span>
                            )}
                            {t.ticketStatus === "cancelled" && (
                              <span className="text-danger fw-bold">
                                {" "}
                                {t.ticketStatus}
                              </span>
                            )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Ticket;
