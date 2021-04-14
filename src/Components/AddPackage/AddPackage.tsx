import React, { useState } from 'react';
import useServices from '../../Services/useServices';
import './AddPackage.css';

function AddPackage(){

    const [title,setTitle] = useState("");
    const [courier,setCourier] = useState("");

    const { postPackage } = useServices();

    function handleTitleChange(e: any) {
        console.log(e.target.value);
        setTitle(e.target.value);
    }

    function handleCourierChange(e: any) {
        console.log(e.target.value);
        setCourier(e.target.value);
    }

    function addPackageToDatabase(){
        console.log(title + courier);
        postPackage(title,courier)
    }


    return (
        <div className="addPackagesPage">
            <div className="packageDetailsBox">
                <h2 id="pageTitle">Enter package details:</h2>
                <input id="packageTitleInput" type="text" placeholder="Package Title" onChange={handleTitleChange}></input>
                <input id="packageCourierInput" type="text" placeholder="Courier"  onChange={handleCourierChange}></input>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="/123">Action</a>
                        <a className="dropdown-item" href="/132">Another action</a>
                        <a className="dropdown-item" href="/1231">Something else here</a>
                    </div>
                </div>
                <button id="addPackageButton"type="button" onClick={addPackageToDatabase}>Add package</button>
            </div>
        </div>
    )
}

export default AddPackage;