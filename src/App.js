import './App.css';
import React, { useState } from "react";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About'
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      typ:type
    })
    setTimeout( ()=>{
      setAlert(null)
    }, 1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container">
          <Routes>
            <Route exact path='/' element={
              <Home showAlert = {showAlert} />
            } />
            <Route exact path='/about' element={
              <About />
            } />
            <Route exact path='/login' element={
              <Login showAlert = {showAlert}/>
            } />
            <Route exact path='/signup' element={
              <Signup showAlert = {showAlert}/>
            } />
          </Routes>
          </div>
        </Router>

      </NoteState>


    </>
  );
}

export default App;
