import './App.css';
import React, { useEffect, useState } from 'react';
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
import Footer from './Components/Footer/Footer';
import EditPackage from './Components/EditPackage/EditPackage';
import LoggedInNavbar from './Components/LoggedInNavbar/LoggedInNavbar';
import useServices from './Services/useServices';




function App() {

  const history = useHistory();

  // function changeRouteToLogin(){
  //   history.push("/login");
  // }

  const [userLoggedIn,setUserLoggedIn] = useState("");
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);

  const { login } = useServices();
  
  useEffect(() => {
    // const user = localStorage.getItem('User');
    // let foundUser: string = user ? user : "";
    // // setUserLoggedIn(foundUser);
    // // console.log("user " + user);
    // changeNavBar(foundUser);
    changeNavBar();
    console.log("use effect called");
  },[]);

  function mylog(){
    getMyLocation();
    // login("admin","edigucci123",latitude,longitude,null,null);
  }

  function setThing(){
    setUserLoggedIn("loggedin");
  }

  function doLogOut(){
    setUserLoggedIn("");
    window.location.reload();
  }



  function getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      location.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(position.coords.latitude +"   dsds " +position.coords.longitude );
      }, (error) => {
        console.log("cant get location");
      })
    }

  }



  function changeNavBar(){
    const user = localStorage.getItem('User');
    let foundUser: string = user ? user : "";
    if(foundUser === "loggedin" || userLoggedIn === "loggedin" ){
      console.log("loggedinnav")
      return <LoggedInNavbar lgout = {doLogOut}/>;
    }else{
      console.log("simplenav")
      return <Navbar/>
    }
  }


  

  


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
        {/* <Navbar/> */}
        {changeNavBar()}
        <div className="fill-window">
          <Switch>
            <Route path="/login">
              <Login myfunc={setThing} />
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
            <Route path="/editpackages">
              <EditPackage/>
              {/* component={EditPackage} */}
            </Route>
            <Route path="/">
              <WelcomePage />
            </Route>
          </Switch>
        </div>
        <Footer/>
    </Router>

  );
}

export default App;
