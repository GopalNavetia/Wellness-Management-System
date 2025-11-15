import './AddUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddUser() {
    const navigate = useNavigate();
    let [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        email: ""
    });

    const handleClose = () => {
        navigate(-1);
    };

    const handleInputChange = (e) => {
        let fieldName = e.target.name;
        let newValue = e.target.value;
        setFormData((currData) => ({
            ...currData,
            [fieldName]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://admonitorial-cinderella-hungerly.ngrok-free.dev/MyProject/AddNewUserAPI', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if (response.data.success) {
                // alert("New User Added: " + response.data.message);
                setFormData({ username: "", password: "", role: "admin", email: "" });
                navigate(-1);
            } else {
                alert('Failed to add user: ' + response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Failed to add user (network/server error).');
            }
            console.error(error);
        }
    };

    const handleReset = () => {
        setFormData({
            username: "",
            password: "",
            role: "",
            email: ""
        });
    };

    return (
        <div className='addUserMainContainer'>
            <div className="addUserContainer">
                <div className="addUserHeadSection">
                    <h1>Add System User</h1>
                    <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <div className='data'>
                            <label htmlFor="username">Username:</label>
                            <input type="text" name="username" value={formData.username} id="username"
                                placeholder="Enter Username" onChange={handleInputChange} />
                        </div>
                        <div className='data'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" value={formData.password} id="password"
                                placeholder='Enter Password' onChange={handleInputChange} autoComplete="new-password" />
                        </div>
                        <div className='data'>
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" value={formData.email} id="email"
                                placeholder="Enter Email" onChange={handleInputChange} />
                        </div>
                        <div className='data'>
                            <label htmlFor="role">Role:</label>
                            <select name="role" value={formData.role} id="role" onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="admin">Admin</option>
                                <option value="therapist">Therapist</option>
                            </select>
                        </div>
                        <div className="buttonContainer">
                            <button id="save" type="submit">Save</button>
                            <button id="reset" type="button" onClick={handleReset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
