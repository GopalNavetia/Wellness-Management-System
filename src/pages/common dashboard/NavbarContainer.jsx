import './NavbarContainer.css'
import navLogo from '../../assets/images/wellnessLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
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
        navigate('/', { replace: true });
    }

    // My Profile Button
    function handleMyProfileClick() {
        navigate('/dashboard/myprofile');
    }

    // Manage User Button
    function handleManageUserClick() {
        navigate('/dashboard/manageuser');
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
                <p onClick={handleMyProfileClick}>My Profile</p>
                <p onClick={handleManageUserClick}>Manage Users</p>
                <p className='logoutBttn' style={{ color: '#ff4d4d' }} onClick={handelLogoutButtonClick}>Logout</p>
            </div>

        </div >
    );
}
