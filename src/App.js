import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Main from './components/Main';
import Pay from './components/Pay';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeePortal from './components/EmployeePortal';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
      </div>
      <Routes>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/employee-login' element={<EmployeeLogin/>} />
        <Route path='/' element={<Main/>} />
        <Route path='/payment' element={<Pay />} />
        <Route path='/employee-portal' element={<EmployeePortal />} />
      </Routes>
    </Router>
  );
}

export default App;
