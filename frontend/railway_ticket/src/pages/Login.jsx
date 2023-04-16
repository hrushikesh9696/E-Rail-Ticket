import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCurrentUser } from "../store/action/user.action";
import { toast, ToastContainer } from "react-toastify";
import homeService from "../service/home.service";
import styled from "styled-components";
const Login = () => {
  const [message, setMessage] = useState("");
  const [logMessage, setLogMessage] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    mobNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    role: "",
    experience: "",
    skill: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, userLogin] = useState({
    email: "",
    password: "",
  });
  const loginUser = useSelector((u) => u.user);

  const { st } = useParams();

  useEffect(() => {});

  // useEffect(() => {
  //   if (loginUser?.id) {
  //     navigate("/");
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    userLogin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    homeService
      .login(login)
      .then((res) => {
        setUser(res.data);

        dispatch(setCurrentUser(res.data));

        if (res.data.role === "ROLE_ADMIN") {
          navigate("/admin/ahome");
        } else if (res.data.role[0].id === 103) {
          navigate("/recruiter/home");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        eMsg("invalid email and password");
        console.log(error);
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
    <Wrapper>
      <div
        className="container-fluid p-5 backimg"
      >
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <div className="card paint-card">
              <div className="card-header ">
                <h4 className="text-dark text-center">Login</h4>
                {message && (
                  <p className="text-center text-danger fs-5">{message}</p>
                )}

                {logMessage && (
                  <p className="text-center text-danger fs-5">{logMessage}</p>
                )}
              </div>
              <div className="card-body">
                <form onSubmit={(e) => loginSubmit(e)}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      name="password"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary col-md-12">
                    Login
                  </button>
                </form>
              </div>
              <div className="card-footer bg-white text-center p-3">
                Don't have account
                <Link to="/register" className="text-decoration-none ms-2">
                  register
                </Link>
                <br />
                <Link to="/forgotPassword" className="text-decoration-none">
                  Forgot Password
                </Link>
              </div>
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
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .backimg {
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      url("../img/rail5.jpg");
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export default Login;
