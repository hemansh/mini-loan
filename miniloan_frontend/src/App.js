import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Home from './pages/home/home.jsx'
import SignUp from './pages/signup/signup.jsx';
import AdminLogin from './pages/admin/adminlogin/login.jsx';
import Dashboard from './pages/admin/admindashboard/dashboard.jsx';
import LoanHistory from './pages/history/loanhistory.jsx'

function App() {
  return (
    <>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<SignUp/>}/>
            <Route exact path='/admin/login' element={<AdminLogin/>}/>
            <Route exact path='/admin/dashboard' element={<Dashboard/>}/>
            <Route exact path='/loanhistory' element={<LoanHistory/>}/>
        </Routes>
    </>
  );
}

export default App;
