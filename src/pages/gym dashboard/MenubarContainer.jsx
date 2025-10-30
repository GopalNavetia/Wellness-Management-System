import './MenubarContainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faDumbbell, faCoins } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";

export default function MenubarContainer() {

    const [isExpanded, setIsExpanded] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    const toggleMenubar = () => {
        setIsExpanded((prev) => !prev);
        setIsVisible((prev) => !prev);
    };

    return (
        <div className="menubar" style={{ width: isExpanded ? "14%" : "3.5%" }}>
            <div className="menuItems">
                <span className='barIcon' onClick={toggleMenubar}><FontAwesomeIcon icon={faBars} /></span>
                <hr />
                <div className='container'>
                    <div className='items'><span className='icons'><FontAwesomeIcon icon={faUser} /></span><h3 style={{ display: isVisible ? "" : "none" }}>Members</h3></div>
                    <div className='items'><span className='icons'><FontAwesomeIcon icon={faDumbbell} /></span><h3 style={{ display: isVisible ? "" : "none" }}>Trainers</h3></div>
                    <div className='items'><span className='icons'><FontAwesomeIcon icon={faCoins} /></span><h3 style={{ display: isVisible ? "" : "none" }}>Finance</h3></div>
                </div>
            </div>
        </div >
    );
}