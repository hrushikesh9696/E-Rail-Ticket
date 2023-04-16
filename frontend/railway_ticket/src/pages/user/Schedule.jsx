import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import trainService from "../../service/train.service";

const Schedule = () => {
  const { tid } = useParams();

  const [schedule, setSchedule] = useState([]);
  const [selectSchedule, setSelectSchedule] = useState({
    id: "",
    departureTime: "",
    arrivalTime: "",
    train: "",
  });

  const [st, setSt] = useState(true);
  const [pst, setPst] = useState(false);
  const [sst, setSst] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    trainService
      .getAllTrainScheduleByTrainId(tid)
      .then((res) => {
        setSchedule(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectTime = (id) => {
    trainService
      .getScheduleById(id)
      .then((res) => {
        setSelectSchedule(res.data);
        setSt(false);
        setSst(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unSelectTime = (id) => {
    setSt(true);
    setSst(false);
    setPst(false);
  };

  const payNow = (e) => {
    e.preventDefault();
    setSt(false);
    setSst(false);
    setPst(true);
  };

  const [ticket, setTicket] = useState({
    journeyDate: "",
    travellerName: "",
    age: "",
    gender: "",
    email: "",
    mobNo: "",
    trainId: "",
    scheduleId: "",
  });

  const handleTicket = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const navigate = useNavigate();

  const saveTicket = (e) => {
    e.preventDefault();
    ticket.trainId = selectSchedule.train.id;
    ticket.scheduleId = selectSchedule.id;

    trainService
      .saveTicket(ticket)
      .then(() => {
        navigate("/user/bookSuccess");
      })
      .catch((error) => {
        console.log(error);
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
      <>
        {st && (
          <div className="container-fluid backimg">
            <div className="row">
              <div className="col-md-8">
                <div className="card mt-3">
                  <div className="card-header text-center fs-4">
                    Train Schedule
                  </div>
                  <div className="card-body">
                    <table class="table table bordered">
                      <thead>
                        <tr>
                          <th scope="col">Train No</th>
                          <th scope="col">Train Name</th>
                          <th scope="col">Route</th>
                          <th scope="col">Price</th>
                          <th scope="col">Departure Time</th>
                          <th scope="col">Arrival Time</th>

                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.map((s, num) => (
                          <tr>
                            <th>{s.train.trainNumber}</th>
                            <td>{s.train.trainName}</td>
                            <td>
                              {s.train.source} - {s.train.destination}
                            </td>
                            <td>{s.train.price}</td>
                            <td>{s.departureTime}</td>
                            <td>{s.arrivalTime}</td>
                            <td>
                              <button
                                onClick={() => selectTime(s.id)}
                                className="btn btn-sm btn-primary"
                              >
                                select
                              </button>
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
        )}

        {sst && (
          <div className="container-fluid backimg">
            <div className="row">
              <div className="col-md-8">
                <div className="card mt-3">
                  <div className="card-header text-center fs-4">
                    Train Schedule
                  </div>
                  <div className="card-body">
                    <table class="table table bordered">
                      <thead>
                        <tr>
                          <th scope="col">Train No</th>
                          <th scope="col">Train Name</th>
                          <th scope="col">Route</th>
                          <th scope="col">Price</th>
                          <th scope="col">Departure Time</th>
                          <th scope="col">Arrival Time</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{selectSchedule.train.trainNumber}</th>
                          <td>{selectSchedule.train.trainName}</td>
                          <td>
                            {selectSchedule.train.source} -
                            {selectSchedule.train.destination}
                          </td>
                          <td>{selectSchedule.train.price}</td>
                          <td>{selectSchedule.departureTime}</td>
                          <td>{selectSchedule.arrivalTime}</td>
                          <td>
                            <button
                              onClick={() => unSelectTime(selectSchedule.id)}
                              className="btn btn-sm btn-success"
                            >
                              selected
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mt-4">
                <div className="card">
                  <div className="card-header fs-4 text-center">
                    Passanger Details
                  </div>
                  <div className="card-body">
                    <form onSubmit={(e) => payNow(e)}>
                      <div className="mb-3">
                        <label>Journey Date</label>
                        <input
                          required
                          type="date"
                          name="journeyDate"
                          className="form-control"
                          value={ticket.journeyDate}
                          onChange={(e) => handleTicket(e)}
                        />
                      </div>

                      <div className="mb-3">
                        <label>Traveller Name</label>
                        <input
                          required
                          type="text"
                          name="travellerName"
                          value={ticket.travellerName}
                          onChange={(e) => handleTicket(e)}
                          className="form-control form-control-sm"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Age</label>
                        <input
                          required
                          type="number"
                          name="age"
                          value={ticket.age}
                          onChange={(e) => handleTicket(e)}
                          className="form-control form-control-sm"
                        />
                      </div>

                      <div class="mb-3">
                        <label>Gender</label>
                        <select
                          required
                          className="form-control form-control-sm"
                          name="gender"
                          value={ticket.gender}
                          onChange={(e) => handleTicket(e)}
                        >
                          <option>--select--</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label>Email</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={ticket.email}
                          onChange={(e) => handleTicket(e)}
                          className="form-control form-control-sm"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Mob No</label>
                        <input
                          required
                          type="number"
                          name="mobNo"
                          value={ticket.mobNo}
                          onChange={(e) => handleTicket(e)}
                          className="form-control form-control-sm"
                        />
                      </div>

                      <button className="btn btn-primary col-md-12">
                        Book Ticket
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {pst && (
          <div class="container-fluid">
            <div class="row">
              <div className="col-md-8">
                <div className="card mt-3">
                  <div className="card-header text-center fs-4">
                    Train Schedule
                  </div>
                  <div className="card-body">
                    <table class="table table bordered">
                      <thead>
                        <tr>
                          <th scope="col">Train No</th>
                          <th scope="col">Train Name</th>
                          <th scope="col">Route</th>
                          <th scope="col">Price</th>
                          <th scope="col">Departure Time</th>

                          <th scope="col">Arrival Time</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{selectSchedule.train.trainNumber}</th>
                          <td>{selectSchedule.train.trainName}</td>
                          <td>
                            {selectSchedule.train.source} -
                            {selectSchedule.train.destination}
                          </td>
                          <td>{selectSchedule.train.price}</td>
                          <td>{selectSchedule.departureTime}</td>
                          <td>{selectSchedule.arrivalTime}</td>
                          <td>
                            <button
                              onClick={() => unSelectTime(selectSchedule.id)}
                              className="btn btn-sm btn-success"
                            >
                              selected
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card paint-card mt-4">
                  <div class="card-header">
                    <div class="row">
                      <h3 class="text-center">Payment Details</h3>
                      <img
                        class="img-responsive cc-img"
                        src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png"
                      />
                    </div>
                  </div>
                  <div class="card-body">
                    <form role="form" onSubmit={(e) => saveTicket(e)}>
                      <div class="row">
                        <div class="col-xs-12">
                          <div class="form-group">
                            <label>Card Number</label>
                            <div class="input-group">
                              <input
                                required
                                type="number"
                                class="form-control"
                                placeholder="Card Number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-4">
                        <div class="col-xs-7 col-md-7">
                          <div class="form-group">
                            <label>
                              <span class="hidden-xs">Exp Date</span>
                            </label>
                            <input
                              required
                              type="number"
                              class="form-control"
                              placeholder="MM / YY"
                            />
                          </div>
                        </div>
                        <div class="col-xs-5 col-md-5 pull-right">
                          <div class="form-group">
                            <label>Cvv</label>
                            <input
                              required
                              type="number"
                              class="form-control"
                              placeholder="CVC"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row mt-4">
                        <div class="form-group">
                          <label>Card Holder Name</label>
                          <input
                            type="text"
                            required
                            class="form-control"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>

                      <div class="row mt-4">
                        <div class="form-group">
                          <label>Total Amount</label>
                          <input
                            readOnly
                            type="text"
                            class="form-control"
                            value={selectSchedule.train.price}
                          />
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <button class="btn btn-warning btn-lg btn-block col-md-12">
                          Pay Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

  .jobcard:hover {
    /*  transform: scale(1.0); */
    /*box-shadow: 0 0 5px rgba(33, 33, 33, .2);
    cursor: pointer; */
    /* box-shadow: 0 5px  5px rgba(0,0,0,0.15);
     */
    position: relative;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out;
  }

  .jobcard a {
    text-decoration: none;
    color: black;
  }

  .jobcard a:hover {
    text-decoration: none;
    color: black;
  }
`;

export default Schedule;
