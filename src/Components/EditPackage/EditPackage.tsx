import React, { useEffect, useState } from "react";
import useServices from '../../Services/useServices';
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Courier{
    id: number;
    name: string;
}

function EditPackage(){

    const { useQuery } = useServices();

    let query = useQuery();

    let courier = query.get("courier");
    let packageCourierName: string = courier ? courier : "";

    let mypackage = query.get("title");
    let packageTitle: string = mypackage ? mypackage : "";

    let myemail = query.get("email");
    let packageEmail: string = myemail ? myemail : "";

    console.log("from url" + query.get("query"));

        // <div>
        //     <h1>Hello {query.get("courier")} {query.get("title")}!</h1>
        // </div>
    


        const [title,setTitle] = useState("");
        const [dropdownValue,setDropdownValue] = useState("");
        const [email,setEmail] = useState("");
        const [couriers,setCouriers] = useState<Courier[]>([]);
        const [options,setOptions] = useState<string[]>([]);

        

        const { postPackage, getCouriers } = useServices();
    
        function handleTitleChange(e: any) {
            console.log(e.target.value);
            setTitle(e.target.value);
        }

        function handleEmailChange(e: any) {
            console.log(e.target.value);
            setEmail(e.target.value);
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
            
            // postPackage(title,dropdownValue,showGoodAlert,showNoParamsAlert,showBadAlert)
            let wantedCourierId = -1;
            let wantedCourierName = dropdownValue;
            for(var i=0; i< couriers.length; i++ ){
                if(couriers[i].name === wantedCourierName){
                console.log("exist");
                wantedCourierId = couriers[i].id;
                //aici faci put
                console.log(title+dropdownValue+email+"cid"+wantedCourierId);
                break;
                }else{
                console.log("not exist")
            }
            
        }
        }

        function createOptions(courierArray: Courier[]){
            console.log("createOptions")
            let opt = courierArray.map((item, i) => {
                console.log("i"+item.name);
                    return item.name;
                }
            );
            setOptions(opt);
        }

        useEffect(() => {
            // Update the document title using the browser API
            console.log("couriers:")
            getCouriers(setCouriers,createOptions);
            setEmail(packageEmail);
            setTitle(packageTitle);
            // console.log("resp" + resp);
            // setMyPackages(resp);
            // console.log("couriers are:"+couriers)
            // createOptions(couriers)
          },[]);
        
    return(
        <div className="addPackagesPage">
            <ToastContainer />
            <div className="packageDetailsBox">
                <h2 id="pageTitle">Edit package details:</h2>
                <input id="packageTitleInput" type="text" placeholder={packageTitle} onChange={handleTitleChange} ></input>
                <input id="packageEmail" type="text" placeholder={packageEmail} onChange={handleEmailChange}></input>
                {/* <input id="packageCourierInput" type="text" placeholder="Courier"  onChange={handleCourierChange}></input> */}
                <div id="packageCourierInput">
                <Dropdown
                    placeholder="Select a courier"
                    options={options}
                    value={options[0]}
                    onChange={(value) => dropDownValueChanges(value.value)}
                    onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                    onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                    onOpen={() => console.log('open!')}
                />
                </div>
                <button id="addPackageButton"type="button" onClick={addPackageToDatabase}>Modify package</button>
            </div>
        </div>
    )
}

export default EditPackage;