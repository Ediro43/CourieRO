import React from 'react';
import './ListHeader.css'

function ListHeader(){
    return (
        <div className="listHeader">
            <div className="listHeaderPackageNumber">
                <span><b>ID</b></span>
            </div>
            <div className="listHeaderCourierName">
                <span><b>Courier</b></span>
            </div>
            <div className="listHeaderPackageTitle">
                <span><b>Package</b></span>
            </div>
            <div className="listHeaderPackageEmail">
                <span><b>E-mail</b></span>
            </div>
            <div className="listHeaderPackageState">
                <span><b>State</b></span>
            </div>
            <div className="actions">
                <span><b>Actions</b></span>
            </div>
        </div>
    );
}

export default ListHeader;