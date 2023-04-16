import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import trainService from "../../service/train.service";

const ViewTicket = () => {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    trainService
      .getTicket()
      .then((res) => {
        setTicket(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelTicket = (id) => {
    const st = window.confirm("Are you sure cancel ticket");
    if (st) {
      trainService
        .cancelTicket(id)
        .then((res) => {
          init();
          sMsg(res.data);
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sMsg = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const eMsg = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <>
        <div className="container-fluid backimg">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card mt-3">
                <div className="card-header text-center fs-4">
                  {" "}
                  Train Ticket
                </div>
                <div className="card-body">
                  <table class="table table bordered ">
                    <thead>
                      <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Train No</th>
                        <th scope="col">Train Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Traveller Details</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="text-center">
                          Payment Status
                        </th>
                        <th scope="col" className="text-center">
                          Ticket Status
                        </th>
                        <th scope="col">Action</th>
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
                          <td className="text-center text-success fw-bold">
                            {t.paymentStatus}
                          </td>
                          <td className="text-center">
                            {t.ticketStatus === "Booked" && (
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
                         
                         
                         
                          <td>
                            {t.ticketStatus === "cancelled" && (
                              <button
                                className="btn btn-danger btn-sm"
                                disabled
                              >
                                cancel
                              </button>
                            )}
                            {t.ticketStatus === "Booked" && (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => cancelTicket(t.id)}
                              >
                                cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .backimg {
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      url("../img/rail4.png");
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
export default ViewTicket;
