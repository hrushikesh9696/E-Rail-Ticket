import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import trainService from "../../service/train.service";

const EditTrain = () => {
  const [train, setTrain] = useState({
    id: "",
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    distance: "",
    price: "",
    seatCount: "",
  });

  const { id } = useParams();

  useEffect(() => {
    trainService
      .getTrainById(id)
      .then((res) => {
        setTrain(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTrain({ ...train, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    trainService
      .updateTrain(train)
      .then((res) => {
        sMsg("Train Update Sucessfully");
        setTimeout(() => {
            navigate("/admin/viewTrain")
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
      <div className="card mt-4">
        <div className="card-header text-center fs-5 bg-white">Edit Train</div>
        <div className="card-body">
          <form onSubmit={(e) => submitForm(e)}>
            <div className="row">
              <div className="col mb-3">
                <label>Train Number</label>
                <input
                  type="number"
                  name="trainNumber"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={train.trainNumber}
                />
              </div>
              <div className="col mb-3">
                <label>Train Name</label>
                <input
                  type="text"
                  name="trainName"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={train.trainName}
                />
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <label>Source</label>
                <input
                  type="text"
                  name="source"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={train.source}
                />
              </div>
              <div className="col mb-3">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={train.destination}
                />
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <label>Distance</label>
                <input
                  type="text"
                  name="distance"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={train.distance}
                />
              </div>
              <div className="col mb-3">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  className="form-control form-control-sm"
                  onChange={(e) => handleInput(e)}
                  value={train.price}
                />
              </div>
            </div>
            <div className="col mb-3">
              <label>Seat</label>
              <input
                type="number"
                name="seatCount"
                required
                className="form-control form-control-sm"
                onChange={(e) => handleInput(e)}
                value={train.seatCount}
              />
            </div>
            <button className="btn btn-primary col-md-12">Update Train</button>
          </form>
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

export default EditTrain;
