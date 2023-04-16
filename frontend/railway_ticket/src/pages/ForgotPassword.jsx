import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import homeService from "../service/home.service";


const ForgotPassword = () => {
  const [st, setSt] = useState("No");
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    email: "",
    password: "",
    mobNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    role: "",
  });
  const [email, setEmail] = useState();
  const [mobNo, setMobNo] = useState();
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMobno = (e) => {
    setMobNo(e.target.value);
  };

  const checkEmail = (e) => {
    e.preventDefault();

    homeService
      .checkEmailAndMob(email, mobNo)
      .then((res) => {
        console.log(!res.data);

        if (!res.data) {
          notify("Invalid email & Mob no");
        } else {
          setUser(res.data);
          setSt("Yes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [newPassword, setNewPassword] = useState();
  const [conPassword, setConPassword] = useState();

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConPassword = (e) => {
    setConPassword(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== conPassword) {
      notify("Password Mismatch");
    } else {
      user.password = newPassword;

      homeService
        .resetPassword(user)
        .then((res) => {
          SuccNotify("Password Reset Sucessfully");
          setSt("No");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const notify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const SuccNotify = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {st === "No" && (
        <div className="container p-5">
          <div className="row">
            <div className="col-md-5 offset-md-3">
              <div className="card paint-card">
                <div className="card-body">
                  <h4 className="form-signin-heading text-center">
                    Forgot Password
                  </h4>

                  <form className="form-signin" onSubmit={(e) => checkEmail(e)}>
                    <div className="mb-3">
                      <label className="form-label">Email address</label>{" "}
                      <input
                        type="email"
                        className="form-control"
                        required
                        name="email"
                        onChange={(e) => handleEmail(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mob No</label>
                      <input
                        required
                        type="number"
                        className="form-control"
                        name="mobno"
                        onChange={(e) => handleMobno(e)}
                      />
                    </div>

                    <button
                      className="btn bg-primary text-white col-md-12"
                      type="submit"
                    >
                      Submit
                    </button>

                    <div className="text-center p-3"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {st === "Yes" && (
        <div className="container p-5">
          <div className="row">
            <div className="col-md-5 offset-md-3">
              <div className="card paint-card">
                <div className="card-body">
                  <h4 className="form-signin-heading text-center">
                    Reset Password
                  </h4>

                  <form
                    className="form-signin"
                    onSubmit={(e) => handleReset(e)}
                  >
                    <div className="mb-3">
                      <label className="form-label">New Password</label>{" "}
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="newPassword"
                        onChange={(e) => handleNewPassword(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        required
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={(e) => handleConPassword(e)}
                      />
                    </div>

                    <button
                      className="btn bg-primary text-white col-md-12"
                      type="submit"
                    >
                      Submit
                    </button>

                    <div className="text-center p-3"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
};

export default ForgotPassword;
