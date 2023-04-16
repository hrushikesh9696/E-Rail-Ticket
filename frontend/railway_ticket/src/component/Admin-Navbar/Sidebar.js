import React, { useEffect } from 'react';
import './assets/css/style.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/img/apple-touch-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser } from '../../store/action/user.action';

const Sidebar = () => {

    const loginUser = useSelector(state => state.user);

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


            {
                loginUser.role === 'ROLE_ADMIN' &&

                <aside id="sidebar" className="sidebar" >

                    <ul className="sidebar-nav" id="sidebar-nav">

                        <li className="nav-item">
                            <Link to="/admin/ahome" className="nav-link ">
                                <i className="bi bi-grid"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="addTrain" className="nav-link collapsed">
                            <i class="fa-regular fa-square-plus"></i>
                                <span>Add Train</span>
                            </Link></li>


                        <li className="nav-item">
                            <Link to="viewTrain" className="nav-link collapsed">
                                <i class="fa-solid fa-list"></i>
                                <span>View Train</span>
                            </Link></li>

                        <li className="nav-item">
                            <Link to="addSchedule" className="nav-link collapsed">
                            <i class="fa-solid fa-circle-plus"></i>
                                <span>Train Schedule</span>
                            </Link></li>

                        <li className="nav-item">
                            <Link to="viewSchedule" className="nav-link collapsed">
                            <i class="fa-solid fa-table-list"></i>
                                <span>View Schedule</span>
                            </Link></li>


                        <li className="nav-item">
                            <Link to="ticket" className="nav-link collapsed">
                            <i class="fa-solid fa-square-check"></i>
                                <span>Ticket </span>
                            </Link></li>

                        <li className="nav-item">
                            <a className="nav-link collapsed" onClick={() => logout()}>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span>Logout</span>
                            </a></li>
                    </ul>
                </aside>

            }



        </>
    )
}

export { Sidebar };
