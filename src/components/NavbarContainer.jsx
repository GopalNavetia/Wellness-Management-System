import './NavbarContainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavbarContainer(props) {

    const navigate = useNavigate();

    // Profile View 
    let [isDropVisible, setDropVisible] = useState(false);

    function handleMouseEnterProfile() {
        setDropVisible(true);
    }

    function handleMouseLeaveProfile() {
        setDropVisible(false);
    }

    // Main Dashboard Navigate
    function handleClickDashboard() {
        navigate('/dashboard');
    }

    // Log out Button
    function handleLogoutButtonClick() {
        // Remove the auth token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        navigate('/', { replace: true });
    }


    return (
        <div className='navContainer'>
            <nav>
                <div className="navTitle" onClick={handleClickDashboard}>
                    <img src={props.logo} alt="wellnessLogo" />
                    <h1>{props.title}</h1>
                </div>
                <div className='profileContainer' onMouseEnter={handleMouseEnterProfile} onMouseLeave={handleMouseLeaveProfile} >
                    <span><FontAwesomeIcon className='icon' icon={faUserTie} /></span>
                    <h3>{props.loginPerson}</h3>
                </div>
            </nav >

            <div className='settings' style={{ display: isDropVisible ? 'block' : 'none' }} onMouseEnter={handleMouseEnterProfile} onMouseLeave={handleMouseLeaveProfile} >
                <Link to='/dashboard/myprofile'>
                    <p>My Profile</p>
                </Link>

                <Link to='/dashboard/manageuser'>
                    <p>Manage Users</p>
                </Link>

                <p className='logoutBttn' style={{ color: '#ff4d4d' }} onClick={handleLogoutButtonClick}>Logout</p>
            </div>

        </div >
    );
}
