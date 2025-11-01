import './MenubarContainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faDumbbell, faCoins } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function MenubarContainer() {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleMenubar = () => {
        setIsExpanded((prev) => !prev);
        setIsVisible((prev) => !prev);
    };

    const navigate = useNavigate();

    // Member Button
    function handelMemberButtonClick() {
        navigate('/gymdashboard');
    }

    // Finance Button
    function handelFinanceButtonClick() {
        navigate('/gymdashboard/financepage');
    }


    return (
        <div className="menubar" style={{ width: isExpanded ? "14%" : "3.5%" }}>
            <div className="menuItems">
                <span className='barIcon' onClick={toggleMenubar}><FontAwesomeIcon icon={faBars} /></span>
                <hr />
                <div className='container'>
                    <div className='items' onClick={handelMemberButtonClick}><span className='icons'><FontAwesomeIcon icon={faUser} /></span><h3 style={{ display: isVisible ? "" : "none" }}>Members</h3></div>
                    <div className='items'><span className='icons'><FontAwesomeIcon icon={faDumbbell} /></span><h3 style={{ display: isVisible ? "" : "none" }}>Trainers</h3></div>
                    <div className='items' onClick={handelFinanceButtonClick}><span className='icons'><FontAwesomeIcon icon={faCoins} /></span><h3 style={{ display: isVisible ? "" : "none" }}>Finance</h3></div>
                </div>
            </div>
        </div >
    );
}