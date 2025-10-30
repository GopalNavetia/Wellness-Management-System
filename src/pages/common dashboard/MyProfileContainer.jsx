import './MyProfileContainer.css';
import adminLogo from '../../assets/images/adminLogo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function MyProfileContainer() {
    const navigate = useNavigate();
    let handleEditButton = () => {
        navigate('/dashboard/edituser');
    };

    let handleClose = () => {
        navigate(-1)
    };
    return (
        <div className='mainContainer'>
            <div className='profileSection'>
                <div className="myProfileHeadSection">
                    <h1>My Profile</h1>
                    <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
                <div className='detailSection'>
                    <img src={adminLogo} alt="adminLogo" />
                    <h1>Admin</h1>
                    <p>user profile information</p>
                    <button onClick={handleEditButton}>Edit</button>
                </div>
                <div className="adminData">
                    <div className='data'>
                        <span className='lable'>Username:</span>
                        <span className='content'>admin</span>
                    </div>
                    <div className='data'>
                        <span className='lable'>Password:</span>
                        <span className='content'>123</span>
                    </div>
                    <div className='data'>
                        <span className='lable'>Role:</span>
                        <span className='content'>admin</span>
                    </div>
                    <div className='data'>
                        <span className='lable'>Email:</span>
                        <span className='content'>admin@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
}   