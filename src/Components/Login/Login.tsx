import React, { useEffect, useState } from 'react';
import useServices from '../../Services/useServices';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props: any){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0);

    useEffect(() => {
        getMyLocation();
    },[]);
    



    const { login } = useServices();

    function handleUsernameChange(e: any) {
        console.log(e.target.value);
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: any) {
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    function loginWithCreditentials(){
        getMyLocation();
        login(username,password,latitude,longitude,showGoodAlert,showBadAlert,props.myfunc);
    }

    function showGoodAlert(){
        toast.success('Successfuly logged in!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function showBadAlert(){
        toast.error('Wrong username/password!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

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




    return(
        <div className="loginPage">
            <ToastContainer />
            {/* <div className="creditentialsBox">
            </div> */}
            <div className="row"> 
                {/* <div className="flex-item">1</div>
                <div className="flex-item">2</div>
                <div className="flex-item">3</div>
                <div className="flex-item">4</div> */}
                <div className="creditentialsBox">
                    <h2 id="loginTitle">Enter your creditentials below:</h2>
                    <input id="inputLoginEmail" type="text" placeholder="Username" onChange={handleUsernameChange}></input>
                    <input id="inputLoginPassword" type="password" placeholder="Password" onChange={handlePasswordChange}></input>
                    <button id="loginButton"type="button" onClick={loginWithCreditentials}>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;