/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useServices } from '../../Services/useServices';
import ListHeader from '../ListHeader/ListHeader';
import ListItem from '../ListItem/ListItem';
import './Packages.css'
import edit from '../../Assets/edit.svg';
import del from '../../Assets/delete.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spacer from '../Spacer/Spacer';
// import { useServices } from '../../Services/useServices';

interface Package{
    id: number;
    packageTitle: string;
    courier_name: string;
    courier_id: string;
}

function Packages(){

    const { getPackages, deletePackage } = useServices();
    const [myPackages, setMyPackages] = useState<Package[]>([]);

    function successfulyDeleted(){
        toast.success('Successfuly deleted package!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function errorDeleting(){
        toast.error('Something wrong happened when deleting an item', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function refreshList(){
        console.log("list refreshed");
        getPackages(setMyPackages);
    }

    function deleteItem(id: number){
        console.log("Delete item number: "+ id)
        deletePackage(id,refreshList,successfulyDeleted,errorDeleting);
    }

    function renderItems(){

        let renderedItems = myPackages.map((item, i) => {
            return (
                <ListItem key={i} number={i+1} courier_name={myPackages[i].courier_name} packageTitle={myPackages[i].packageTitle} packageId = {myPackages[i].id} courierId = {myPackages[i].courier_id}deleteFunction={deleteItem}/>
            )
        })

        if(renderedItems.length > 0){
            renderedItems.push(
                <Spacer key="aaa"/>
            )
        }
        return renderedItems

    }

    useEffect(() => {
        // Update the document title using the browser API
        console.log("effect")
        getPackages(setMyPackages);
        // console.log("resp" + resp);
        // setMyPackages(resp);
      },[]);

    
    
    return (
        <div className="packagesPage">
            <ToastContainer />
            <h1 id="packagesWelcome"><b>Welcome Admin</b></h1>
            <h4 id="packagesDesc">Here you can see all the availible packages, edit or delete them</h4>
            <ListHeader/>
            {renderItems()}
            {/* <ListItem/> */}
            {/* <div className="topPart">
                Some message
            </div>
            <div className="renderedItems">
                <ListHeader/>
                {renderItems()}
            </div> */}
            
        </div>
    )
}

export default Packages;


