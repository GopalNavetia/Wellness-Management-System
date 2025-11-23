import './ManageUsersContainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import UsersData from '../../mocks/UsersData'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance.jsx'

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
        // Ask for confirmation
        const ok = window.confirm(`Are you sure you want to delete user "${username}"?`);

        // If user clicks Cancel, just return
        if (!ok) return;

        try {
            await axiosInstance.delete(
                `/MyProject/DeleteUserAPI?username=${username}`,
                { headers: { "ngrok-skip-browser-warning": "true" } }
            );
            // Update UI after successful deletion
            setFetchData(prevData => prevData.filter(user => user.username !== username));
            alert("User deleted successfully.");
        } catch (error) {
            console.log(error.response);
            alert("Failed to delete user. Please try again.");
        }
    };


    let handleCloseButton = () => {
        navigate('/dashboard');
    };

    // Data Fetch 
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const result = await axiosInstance.get('/MyProject/TransferDataUser', {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                        // Don't add Authorization: interceptor sends it from localStorage
                    }
                });
                setFetchData(result.data);
            } catch (error) {
                if (error.response && error.response.data) {
                    // Print exact backend error message if exists
                    console.log('API Error:', error.response.data);
                } else {
                    console.log('General Error:', error.message);
                }
            } finally {
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
                <td>
                    <button onClick={() => { handleEditButton(user.username) }}>Edit</button>
                    <button onClick={() => { handleDeleteButton(user.username) }}>Delete</button>
                </td>
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