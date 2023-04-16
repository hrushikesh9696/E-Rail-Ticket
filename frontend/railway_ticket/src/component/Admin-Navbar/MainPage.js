import React from 'react'
import { useSelector } from 'react-redux';

import { AdminNavbar } from './admin-navbar'
import { NavPage } from './NavPage';
import { Sidebar } from './Sidebar';


const MainPage = () => {
    return (
        <div>
            <AdminNavbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9" style={{marginLeft:-70}}>
                        <NavPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { MainPage };
