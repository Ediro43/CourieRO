import React from 'react';
import './WelcomePage.css';
import courier from './courier_hi.png';
import Navbar from '../Navbar/Navbar';

function WelcomePage(){
    return(
        <div className="mainLayout">

            <div className="leftMain">
                <div className="leftInsideMain">
                    <h1 className="brandName">Courie<span className="myspan">RO</span></h1>
                    <h3 className="underText">Delivery services</h3>
                    <h3 className="slogan">With us your package is safe!</h3>
                </div>
            </div>
            <div className="rightMain">
                <img src={courier} className="courierimg" alt="mycourier" width={800}></img>
            </div>
            
        </div>
    )
}

export default WelcomePage;