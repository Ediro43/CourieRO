import React from 'react';
import './ContactUs.css'

function ContactUs(){
    return(
        <div className="contactUsPage">
            <div className="message">
                <div className="textDiv">
                    <h2 id="contactUsTitle">Hello, would you like to contact us?</h2>
                    <p id="contactUsIndication">We value your suggestions, so we'd like to know your ideas of how we can improve our service!</p>
                </div>
            </div>
            <div className="creditentialsBox">
                <h2 id="ctus">Contact us right away!</h2>
                <p id="phoneNum"><strong >Phone number: </strong>+40736991188</p>
                <p id="emailAdd"><strong >Email address: </strong>strike.software123@gmail.com</p>
                <p id="fax"><strong >Fax: </strong>+021 - 6370668</p>
                <h2 id="schedule">Schedule</h2>
                <p id="weekdays"><strong >Weekdays: </strong>08:00 - 18:30</p>
                <p id="saturday"><strong >Saturday: </strong>08:00 - 15:30</p>
                <p id="sunday"><strong >Sunday: </strong>Closed</p>
            </div>
        </div>
    )
}

export default ContactUs;