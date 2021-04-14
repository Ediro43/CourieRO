import React from 'react';
import './ListItem.css';

function ListItem(props: any){

    
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
            <button className="buttonSelect">Click</button>
        </div>
    )
}

export default ListItem;