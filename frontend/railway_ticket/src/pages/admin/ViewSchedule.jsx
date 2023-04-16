import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import trainService from '../../service/train.service';

const ViewSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    trainService
      .getAllTrainSchedule()
      .then((res) => {
        setSchedule(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const edit = (id) => {
    const st = window.confirm("Do you want Edit");
    if (st) {
      navigate("/admin/editSchedule/" + id);
    }
  };

  const deleteTrain = (id) => {
    const st = window.confirm("Do you want Delete");
    if (st) {
      trainService
        .deleteTrainSchedule(id)
        .then(() => {
          sMsg("Delete Successfully");
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

  return (
    <>
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
      <div className="card mt-3">
        <div className="card-header text-center fs-4">All Train Schedule</div>
        <div className="card-body">
          <table class="table table bordered">
            <thead>
              <tr>
                <th scope="col">Sl No</th>
                <th scope="col">Train No</th>
                <th scope="col">Train Name</th>
                <th scope="col">Route</th>
                <th scope="col">Run On Day</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, num) => (
                <tr>
                  <th scope="row">{num + 1}</th>

                  <td>{s.train.trainNumber}</td>
                  <td>{s.train.trainName}</td>
                  <td>{s.train.source}-{s.train.destination}</td>
                  <td>{s.runOnDay}</td>
                  <td>{s.departureTime}</td>
                  <td>{s.arrivalTime}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => edit(s.id)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTrain(s.id)}
                      className="btn btn-sm btn-danger ms-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewSchedule