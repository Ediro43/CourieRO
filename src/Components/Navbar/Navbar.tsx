/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from "react-router-dom";
import React from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.svg';

function Navbar(){

  const history = useHistory();

  const changeToLogin = () => {
    let path = 'login';
    history.push(path);
  }

  const changeToWelcome = () => {
    let path = '';
    history.push(path);
  }

    return(
        <div className="myNavbar">
            <div>
        <nav className="navbar navbar-expand-lg navbarColor">
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}
            <input type="image" src={logo} alt="" height="50" onClick={changeToWelcome}></input>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>
          <form className="d-flex">
            <a className="nav-link active navbarLinks" aria-current="page" href="/packages">All packages</a>
            <a className="nav-link active navbarLinks" aria-current="page" href="/addpackage">Add package</a>
            <a className="nav-link active navbarLinks" aria-current="page" href="/contactus">Contact us</a>
            <button type="button" className="btnMargin btn btn-outline-light fontclass" onClick={changeToLogin} >Login</button>
          </form>
          </div>
        </div>
        </nav>
    </div>
        </div>
    )
}

export default Navbar;