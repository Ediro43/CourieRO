import './App.css';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  BrowserRouter
} from "react-router-dom";
import AboutUs from './Components/AboutUs/AboutUs';
import Login from './Components/Login/Login';
import ContactUs from './Components/ContactUs/ContactUs';
import Packages from './Components/Packages/Packages';
import AddPackage from './Components/AddPackage/AddPackage';




function App() {

  const history = useHistory();

  // function changeRouteToLogin(){
  //   history.push("/login");
  // }

  


  return (
    // <div classNameName="App">
    //   <header classNameName="App-header">
    //     <img src={logo} classNameName="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       classNameName="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>


      <Router >
        <Navbar/>
        <div className="fill-window">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/aboutus">
              <AboutUs />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/packages">
              <Packages />
            </Route>
            <Route path="/addpackage">
              <AddPackage/>
            </Route>
            <Route path="/">
              <WelcomePage />
            </Route>
          </Switch>
        </div>
        <div className="bottomDiv">
          ssssaa
        </div>
    </Router>

  );
}

export default App;
