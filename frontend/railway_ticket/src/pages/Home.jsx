import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import trainService from "../service/train.service";

const Home = () => {
  const [train, setTrain] = useState([]);

  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [st, setSt] = useState(false);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let train = await trainService.getAllTrain();
    const allSource = [...new Set(train.data.map((s) => s.source.trimEnd()))];
    const allDest = [
      ...new Set(train.data.map((s) => s.destination.trimEnd())),
    ];
    setSource(allSource);
    setDestination(allDest);
  };

  const [srch, setSearch] = useState({
    source: "",
    destination: "",
    date: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearch({ ...srch, [name]: value });
  };

  const search = (e) => {
    e.preventDefault();

    if (srch.source === srch.destination) {
      eMsg("sorry ! source and destination are same");
    } else {
      trainService
        .searchTrain(srch)
        .then((res) => {
          if (res.data.length > 0) {
            setSt(true);
            setTrain(res.data);
          } else {
            eMsg("Train Not Available");
          }
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
  const loginUser = useSelector((u) => u.user);
  const navigate = useNavigate();

  const book = (tid) => {
    if (!loginUser) {
      navigate("/login");
    } else {
      navigate("/user/schedule/" + tid);
    }
  };

  return (
    <Wrapper>
      <div class="backimg">
        <div class="row p-4">
          <div class="col-md-12 ">
            <div className="card">
              <div className="card-header fs-4 text-center bg-white text-dark fw-bold">Search Train</div>
              <div className="card-body">
                <form onSubmit={(e) => search(e)}>
                  <div className="row">
                    <div class="mb-3 mt-3 col-5">
                      <select
                        className="form-control"
                        name="source"
                        onChange={(e) => handleInput(e)}
                      >
                        <option>From</option>
                        {source.map((s) => (
                          <option>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div class="mb-3 mt-3 col-5">
                      <select
                        className="form-control"
                        name="destination"
                        onChange={(e) => handleInput(e)}
                      >
                        <option>To</option>
                        {destination.map((d) => (
                          <option>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col mt-3">
                      <button class="btn bg-primary text-light ">
                        <i class="fa-solid fa-magnifying-glass"></i> Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {train.length > 0 && (
            <div className="col-md-10 offset-md-1">
              <div className="card mt-3">
                <div className="card-header text-center fs-4">All Train</div>
                <div className="card-body">
                  <table class="table table bordered">
                    <thead>
                      <tr>
                        <th scope="col">Train No</th>
                        <th scope="col">Train Name</th>
                        <th scope="col">Route</th>
                        <th scope="col">Distance</th>
                        <th scope="col">Price</th>

                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {st &&
                        train.map((t, num) => (
                          <tr>
                            <th>{t.trainNumber}</th>
                            <td>{t.trainName}</td>
                            <td>
                              {t.source} - {t.destination}
                            </td>
                            <td>{t.distance}</td>
                            <td>{t.price}</td>
                            {/* <td>{t.seatCount}</td> */}
                            <td>
                              <button
                                onClick={() => book(t.id)}
                                className="btn btn-sm btn-primary"
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
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
      />
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

export default Home;
