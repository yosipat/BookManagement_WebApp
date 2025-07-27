import { useContext, useEffect, useState } from "react";
import "./Navbar.css"
import { BrowserRouter, Route, Routes, Link, useParams, useNavigate, Outlet, Navigate } from 'react-router-dom'
import { ModeContext } from "./ModeContextProvider";
import logo from "./logo.png"

const Navbar = () => {

  const { mode } = useContext(ModeContext);
  const { toggleMode } = useContext(ModeContext);

  const [classAdmin, setClassAdmin] = useState('hide');
  const [classUser, setClassUser] = useState('hide');

  const navigate = useNavigate();

  useEffect(() => {
    setClassAdmin(mode === 'admin' ? 'hide' : 'show')
    setClassUser(mode === 'user' ? 'hide' : 'show')
  }, [mode])

  function btnUser() {
    toggleMode("user")
    navigate('/')
  }

  function btnAdmin() {
    navigate('/login')
  }

  function btnHome() {
    navigate('/')
  }

  return (
    <div className={mode}>
      <div className="navbar">
        <div className="menu">
          <div className="logo"><h2>The Book.</h2></div>
          <div>
            <button onClick={btnHome}>
              Home
            </button>
            <button className={classAdmin} style={{"backgroundColor":"#000000"}} onClick={btnAdmin}>
              Switch to Admin
            </button>
            <button className={classUser} onClick={btnUser}>Switch to User
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar