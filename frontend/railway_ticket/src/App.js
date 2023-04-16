import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import { Index } from './pages/Index';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import UnAuthorized from './pages/UnAuthorized';
import ForgotPassword from './pages/ForgotPassword';
import { AuthGuard } from './guard/auth.guard';
import { MainPage } from './component/Admin-Navbar/MainPage';
import 'react-toastify/dist/ReactToastify.css';
import Schedule from './pages/user/Schedule';
import BookSuccess from './pages/user/BookSuccess';
import ViewTicket from './pages/user/ViewTicket';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/401' element={<UnAuthorized />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>

        {/* <Route path='/user/applyJob/:id' element={<ApplyJob />}></Route> */}

        <Route path='/user/*'>
          <Route path='schedule/:tid' element={<AuthGuard roles={['ROLE_USER']}><Schedule /></AuthGuard>} />
          <Route path='bookSuccess' element={<AuthGuard roles={['ROLE_USER']}><BookSuccess /></AuthGuard>} />
          <Route path='viewTicket' element={<AuthGuard roles={['ROLE_USER']}><ViewTicket /></AuthGuard>} />
        </Route>


        <Route path='/admin/*' element={
          <AuthGuard roles={['ROLE_ADMIN']}>
            <MainPage />
          </AuthGuard>
        }> </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
