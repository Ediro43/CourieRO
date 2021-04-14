/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useServices } from '../../Services/useServices';
import ListItem from '../ListItem/ListItem';
import './Packages.css'
// import { useServices } from '../../Services/useServices';

interface Package{
    id: number;
    packageTitle: string;
    courier_name: string;
    courier_id: string;
}

function Packages(){

    const { getPackages } = useServices();
    const [myPackages, setMyPackages] = useState<Package[]>([]);

    function renderItems(){

        
        const numberOfItems = [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17
        ]

        let renderedItems = myPackages.map((item, i) => {
            return (
                <ListItem key={i} number={myPackages[i].id} courier_name={myPackages[i].courier_name} packageTitle={myPackages[i].packageTitle}/>
            )
        })
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
            {/* <ListItem/> */}
            <div className="topPart">
                Some message
            </div>
            <div className="renderedItems">
                {renderItems()}
            </div>
            
        </div>
    )
}

export default Packages;


