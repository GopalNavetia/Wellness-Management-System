import './MyProfileContainer.css';
import adminLogo from '../../assets/images/adminLogo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import axiosInstance from '../../utils/AxiosInstance.jsx'
import { useNavigate } from 'react-router-dom';

export default function MyProfileContainer() {

    // API base URL
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend
    useEffect(() => {
        async function fetchUserDetail() {
            try {
                const response = await axiosInstance.get(`/MyProject/EditUserGetDataAPI?username=${localStorage.getItem('username')}`, {
                    headers: { "ngrok-skip-browser-warning": "true" }
                })
                setFetchData(response.data);
            } catch (error) {
                console.error('Error fetching member data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUserDetail();
    }, []);

    const navigate = useNavigate();
    let handleEditButton = () => {
        navigate('/dashboard/edituser');
    };

    let handleClose = () => {
        navigate(-1)
    }; 

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

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
                        <span className='content'>{fetchData.username}</span>
                    </div>
                    <div className='data'>
                        <span className='lable'>Role:</span>
                        <span className='content'>{fetchData.role}</span>
                    </div>
                    <div className='data'>
                        <span className='lable'>Email:</span>
                        <span className='content'>{fetchData.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}   