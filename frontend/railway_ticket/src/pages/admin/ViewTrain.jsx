import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import trainService from "../../service/train.service";

const ViewTrain = () => {
  const [train, setTrain] = useState([]);

  useEffect(() => {
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

  const navigate = useNavigate();
  const edit = (id) => {
    const st = window.confirm("Do you want Edit");
    if (st) {
      navigate("/admin/editTrain/" + id);
    }
  };

  const deleteTrain = (id) => {
    const st = window.confirm("Do you want Delete");
    if (st) {
      trainService
        .deleteTrain(id)
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
        <div className="card-header text-center fs-4">All Train</div>
        <div className="card-body">
          <table class="table table bordered">
            <thead>
              <tr>
                <th scope="col">Sl No</th>
                <th scope="col">Train No</th>
                <th scope="col">Train Name</th>
                <th scope="col">Source</th>
                <th scope="col">Destination</th>
                <th scope="col">Price</th>
                <th scope="col">Seat</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {train.map((t, num) => (
                <tr>
                  <th scope="row">{num + 1}</th>

                  <td>{t.trainNumber}</td>
                  <td>{t.trainName}</td>
                  <td>{t.source}</td>
                  <td>{t.destination}</td>
                  <td>{t.price}</td>
                  <td>{t.seatCount}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => edit(t.id)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTrain(t.id)}
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
};

export default ViewTrain;
