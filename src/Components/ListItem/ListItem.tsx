import React from 'react';
import { useHistory } from "react-router-dom";
import './ListItem.css';
import edit from '../../Assets/edit.svg';
import del from '../../Assets/delete.svg';

function ListItem(props: any){

    const history = useHistory();

    function deleteItem(){
        props.deleteFunction(props.packageId)
    }

    console.log("Item courier id:" + props.courierId);
    console.log("Item package id:" + props.packageId);


    const changeToEditPackage = () => {
        let path = 'editpackages/' ;
        history.push(path + '?courier=' + props.courier_name + "&id=" + props.packageId + "&title="+props.packageTitle+"&email="+props.email);
        // history.push(
        //     {
        //         pathname: '/editpackage',
        //         search: '?courier=' + props.courier_name +"&"+"title="+props.packageTitle
        //         // state: { detail: response.data }
        //       }
        // )
        
    }

    
    return (
        <div className="listItem">
            <div className="packageNr">
                <span className="courierSpanNumber">{props.number}</span>
            </div>
            <div className="courierName">
                <span className="courierNameSpan">{props.courier_name}</span>
            </div>
            <div className="packageTitle">
                <span className="courierSpanTitle">{props.packageTitle}</span>
            </div>
            <div className="packageEmail">
                <span className="packageSpanEmail">{props.email}</span>
            </div>
            <div className="packageState">
                <span className="packageSpanState">{props.state}</span>
            </div>
            <input className="buttonEdit" alt="" type="image" src={edit} onClick={changeToEditPackage} />
            <input className="buttonDelete" alt="" type="image" src={del} onClick={deleteItem} />
            {/* <button className="buttonEdit">Edit</button> */}
            {/* <button className="buttonDelete" onClick={deleteItem}>Delete</button> */}
        </div>
    )
}

export default ListItem;