import './ManageUsersContainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import UsersData from '../../mocks/UsersData'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageUsersConatiner() {
    const navigate = useNavigate();
    let handleAddButton = () => {
        navigate('/dashboard/adduser');
    };

    let handleEditButton = () => {
        navigate('/dashboard/edituser');
    };

    let handleCloseButton = () => {
        navigate('/dashboard');
    };

    // Data Fetch 
    // const API_BASE_URL = 'https://admonitorial-cinderella-hungerly.ngrok-free.dev/MyProject/TransferDataUser';
    // const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     async function fetchUsers() {
    //         try {
    //             const result = await axios.get(API_BASE_URL, {
    //                 headers: {
    //                     "ngrok-skip-browser-warning": "true"
    //                 }
    //             });
    //             setFetchData(result.data);
    //         } catch (error) {    
    //             console.log(error);
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchUsers();
    // }, []);

    function generateUserData() {
        // Stored Data For Validation
        // let storedUser = UsersData;
        let storedUser = UsersData || [];

        return storedUser.map(user => (
            <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td><button onClick={handleEditButton}>Edit</button> <button>Delete</button></td>
            </tr>
        ));
    }

    return (
        <div className='userMainContainer'>

            <div className='headSection'>
                <h1>Manage System Users</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className='userListContainer'>
                {loading ? (
                    <div>Loading users...</div> // Loading indicator/message
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generateUserData()}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}