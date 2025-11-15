import './ManageUsersContainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import UsersData from '../../mocks/UsersData'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackendURL from '../../utils/BackendURL'

export default function ManageUsersConatiner({ onEditUser }) {
    const navigate = useNavigate();
    let handleAddButton = () => {
        navigate('/dashboard/adduser');
    };

    let handleEditButton = (username) => {
        onEditUser(username)
        navigate('/dashboard/edituser');
    };

    let handleDeleteButton = async (username) => {
        // console.log("Delete Button click")
        try {
            await axios.delete(`${BackendURL}/MyProject/DeleteMemberAPI?username=${username}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            // Update UI after Successfull deletion
            setFetchData(prevData => prevData.filter(user => user.username !== username));
        } catch (error) {
            console.log(error);
        }
    }

    let handleCloseButton = () => {
        navigate('/dashboard');
    };

    // Data Fetch 
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const result = await axios.get(`${BackendURL}/MyProject/TransferDataUser`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                setFetchData(result.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    function generateUserData() {
        // Stored Data For Validation
        // let storedUser = UsersData;
        let storedUser = fetchData || [];

        return storedUser.map(user => (
            <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td><button onClick={() => { handleEditButton(user.username) }}>Edit</button> <button onClick={() => { handleDeleteButton(user.username) }}>Delete</button></td>
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