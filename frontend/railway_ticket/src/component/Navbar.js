import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCurrentUser } from '../store/action/user.action';
import './navbar.css';

const Navbar = () => {

    const loginUser = useSelector((u) => u.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        const st = window.confirm("Are u sure Want logout");
        if (st) {
            dispatch(clearCurrentUser());
            navigate("/login");
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary mynav">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/"><i class="fa-solid fa-train"></i> Railway Ticket Reservation</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                        </ul>

                        {
                            !loginUser && <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <Link to="login" className="nav-link active" ><i className="fa-solid fa-right-to-bracket"></i> LOGIN</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="register" className="nav-link active"> REGISTER</Link>
                                </li>
                            </ul>
                        }



                        {
                            loginUser && <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                {
                                    loginUser?.role === 'ROLE_USER' && <li className="nav-item">
                                        <Link to="/user/viewTicket" className="nav-link active"><i class="fa-solid fa-list"></i> Ticket</Link>
                                    </li>
                                }


                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-circle-user"></i> {loginUser.fullName}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" onClick={() => logout()}>logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
