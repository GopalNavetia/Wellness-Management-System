import './NavbarContainer.css'
import navLogo from '../../assets/images/wellnessLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavbarContainer() {

    const navigate = useNavigate();

    // Profile View 
    let [isDropVisible, setDropVisible] = useState(false);

    function handleMouseEnterProfile() {
        setDropVisible(true);
    }

    function handleMouseLeaveProfile() {
        setDropVisible(false);
    }

    // Log out Button
    function handelLogoutButtonClick() {
        // Remove the auth token from localStorage
        localStorage.removeItem('authToken');
        navigate('/', { replace: true });
    }

    return (
        <div className='navContainer'>
            <nav>
                <div>
                    <img src={navLogo} alt="wellnessLogo" />
                    <h1>Wellness Management System</h1>
                </div>
                <div className='profileContainer' onMouseEnter={handleMouseEnterProfile} onMouseLeave={handleMouseLeaveProfile} >
                    <span><FontAwesomeIcon className='icon' icon={faUserTie} /></span>
                    <h3>Admin Name</h3>
                </div>
            </nav >

            <div className='settings' style={{ display: isDropVisible ? 'block' : 'none' }} onMouseEnter={handleMouseEnterProfile} onMouseLeave={handleMouseLeaveProfile} >
                <Link to='/dashboard/myprofile'>
                    <p>My Profile</p>
                </Link>

                <Link to='/dashboard/manageuser'>
                    <p>Manage Users</p>
                </Link>

                <p className='logoutBttn' style={{ color: '#ff4d4d' }} onClick={handelLogoutButtonClick}>Logout</p>
            </div>

        </div >
    );
}
