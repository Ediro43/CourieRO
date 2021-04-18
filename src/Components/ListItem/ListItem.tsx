import React from 'react';
import './ListItem.css';
import edit from '../../Assets/edit.svg';
import del from '../../Assets/delete.svg';

function ListItem(props: any){

    
    function deleteItem(){
        props.deleteFunction(props.number)
    }

    function saySala(){
        console.log("sala");
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
            <input className="buttonEdit" alt="" type="image" src={edit} onClick={saySala} />
            <input className="buttonDelete" alt="" type="image" src={del} onClick={deleteItem} />
            {/* <button className="buttonEdit">Edit</button> */}
            {/* <button className="buttonDelete" onClick={deleteItem}>Delete</button> */}
        </div>
    )
}

export default ListItem;