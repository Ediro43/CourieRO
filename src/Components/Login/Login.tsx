import React from 'react';
import './Login.css'

function Login(){
    return(
        <div className="loginPage">
            {/* <div className="creditentialsBox">
            </div> */}
            <div className="row"> 
                {/* <div className="flex-item">1</div>
                <div className="flex-item">2</div>
                <div className="flex-item">3</div>
                <div className="flex-item">4</div> */}
                <div className="creditentialsBox">
                    <h2 id="loginTitle">Enter your creditentials below:</h2>
                    <input id="inputLoginEmail" type="text" placeholder="E-mail"></input>
                    <input id="inputLoginPassword" type="password" placeholder="Password"></input>
                    <button id="loginButton"type="button">Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;