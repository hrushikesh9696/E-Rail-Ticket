import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddSchedule from '../../pages/admin/AddSchedule';
import AddTrain from '../../pages/admin/AddTrain';
import EditTrain from '../../pages/admin/EditTrain';
import EditTrainSchedule from '../../pages/admin/EditTrainSchedule';
import Home from '../../pages/admin/Home';
import Ticket from '../../pages/admin/Ticket';
import ViewSchedule from '../../pages/admin/ViewSchedule';
import ViewTrain from '../../pages/admin/ViewTrain';

const NavPage = () => {

    return (

        <div>
            <Routes>
                {/* <Route path='/' element={<Home />}></Route> */}


                {/* Recruiter route */}

                {/* admin route */}

                <Route path='/ahome' element={<Home />}></Route>
                <Route path='/addTrain' element={<AddTrain />}></Route>
                <Route path='/editTrain/:id' element={<EditTrain />}></Route>
                <Route path='/viewTrain' element={<ViewTrain />}></Route>
                <Route path='/addSchedule' element={<AddSchedule />}></Route>
                <Route path='/editSchedule/:id' element={<EditTrainSchedule />}></Route>
                <Route path='/viewSchedule' element={<ViewSchedule />}></Route>
                <Route path='/ticket' element={<Ticket />}></Route>

                {/* <Route path='/aviewJob' element={<AViewAllJobs />}></Route>
                <Route path='/aviewJob/:id' element={<AViewJob />}></Route>
                <Route path='/viewUser' element={<ViewUser />}></Route>
                <Route path='/viewRecruiter' element={<ViewRecruiter />}></Route> */}



            </Routes>

        </div>

    )
}

export { NavPage };
