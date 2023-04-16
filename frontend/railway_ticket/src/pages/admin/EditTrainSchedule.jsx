import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import trainService from "../../service/train.service";

const EditTrainSchedule = () => {
  const [schedule, setSchedule] = useState({
    id: "",
    runOnDay: "--select--",
    departureTime: "",
    arrivalTime: "",
    train: "",
  });

  const { id } = useParams();

  const [train, setTrain] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    trainService
      .getScheduleById(id)
      .then((res) => {
        setSchedule(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    init();
  }, []);

  const init = () => {
    trainService
      .getAllTrain()
      .then((res) => {
        setTrain(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(schedule);
    trainService
      .updateTrainSchedule(schedule)
      .then((res) => {
        sMsg("Schedule Update Sucessfully");
        setTimeout(() => {
          navigate("/admin/viewSchedule");
        }, 3000);
      })
      .catch((error) => {
        eMsg(error.response.data);
      });
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
    <>
      <div className="col-md-6 offset-md-3">
        <div className="card mt-4">
          <div className="card-header text-center fs-5 bg-white">
            Add Schedule
          </div>
          <div className="card-body">
            <form onSubmit={(e) => submitForm(e)}>
              <div className="col mb-3">
                <label>Day</label>
                <select
                  className="form-control"
                  name="runOnDay"
                  onChange={(e) => handleInput(e)}
                >
                  <option>{schedule.runOnDay}</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thrusday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>
              <div className="col mb-3">
                <label>Departure Time</label>
                <input
                  type="time"
                  name="departureTime"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={schedule.departureTime}
                />
              </div>

              <div className="col mb-3">
                <label>Arrival Time</label>
                <input
                  type="time"
                  name="arrivalTime"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={schedule.arrivalTime}
                />
              </div>
              <div className="col mb-3">
                <label>Train</label>
                <select
                  className="form-control"
                  name="trainId"
                  onChange={(e) => handleInput(e)}
                >
                  <option>
                    {schedule.train.trainName} ({schedule.train.trainNumber})
                  </option>
                  {train.map((t) => (
                    <option value={t.id}>
                      {t.trainName} ({t.trainNumber})
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn btn-primary col-md-12">
                Update Schedule
              </button>
            </form>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default EditTrainSchedule;
