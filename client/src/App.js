import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ImageUploadForm from './ImageUploadForm';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/HomePage/Home'; 
import SignUp from './pages/SignUp'
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [logInForm, setLogInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch('/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, []);

  console.log(user)

  return (
    <div>
      <NavBar user={user} setUser={setUser} logInForm={logInForm} setLogInForm={setLogInForm} errorMessage={errorMessage} setErrorMessage={setErrorMessage} handleOpen={handleOpen} handleClose={handleClose}/>
        <Routes>
          <Route path='/' element={<Home user={user} setUser={setUser} logInForm={logInForm} setLogInForm={setLogInForm}/>}/>
        </Routes>
    </div>
  )
}

export default App;
