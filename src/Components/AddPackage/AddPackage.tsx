import useServices from '../../Services/useServices';
import './AddPackage.css';
import React, { useState } from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AddPackage(){

    const [title,setTitle] = useState("");
    const [dropdownValue,setDropdownValue] = useState("");
    const options = [
        'Edi', 'Victor', 'Cristi','Baba'
      ];
    const defaultOption = options[0];

    const { postPackage } = useServices();
    
    const notify = () => toast("Wow so easy!");

    function handleTitleChange(e: any) {
        console.log(e.target.value);
        setTitle(e.target.value);
    }

    function dropDownValueChanges(value: any){
        console.log("vll"+value);
        setDropdownValue(value);
    }

    function showGoodAlert(){
        toast.success('Successfuly added a package!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function showNoParamsAlert(){
        toast.warn('Complete both fields before proceding!', {
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
        toast.error('Something wrong happend', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    }

    function addPackageToDatabase(){
        console.log(title+dropdownValue);
        postPackage(title,dropdownValue,showGoodAlert,showNoParamsAlert,showBadAlert)
    }


    return (
        <div className="addPackagesPage">
            <ToastContainer />
            <div className="packageDetailsBox">
                <h2 id="pageTitle">Enter package details:</h2>
                <input id="packageTitleInput" type="text" placeholder="Package Title" onChange={handleTitleChange}></input>
                {/* <input id="packageCourierInput" type="text" placeholder="Courier"  onChange={handleCourierChange}></input> */}
                <div id="packageCourierInput">
                <Dropdown
                    placeholder="Select an option"
                    options={options}
                    // value={options[0]}
                    onChange={(value) => dropDownValueChanges(value.value)}
                    onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                    onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                    onOpen={() => console.log('open!')}
                />
                </div>
                <button id="addPackageButton"type="button" onClick={addPackageToDatabase}>Add package</button>
            </div>
        </div>
    )
}

export default AddPackage;