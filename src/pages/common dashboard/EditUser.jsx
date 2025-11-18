import './EditUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance.jsx'

export default function EditUser({ username }) {
    const navigate = useNavigate();

    let [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        email: ""
    });

    // Fetch user data when component mounts or username changes
    useEffect(() => {
        if (username) {
            axiosInstance.get(`/MyProject/EditUserGetDataAPI?username=${username}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            })
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error("Failed to load user data:", error);
                });
        }
    }, [username]);

    let handleClose = () => navigate(-1);

    let handleInputChange = (e) => {
        let fieldName = e.target.name;
        let newValue = e.target.value;
        setFormData((currData) => ({
            ...currData,
            [fieldName]: newValue
        }));
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting PUT data:", formData, "oldUsername:", username);

            const response = await axiosInstance.put(
                `/MyProject/EditUserAPI?oldUsername=${username}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );
            if (response.data.success) {
                setFormData({ username: "", password: "", role: "", email: "" });
                navigate(-1);
            } else {
                alert('Failed to edit user: ' + response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Failed to edit user (network/server error).');
            }
            console.error(error);
        }
    };

    let handleReset = () => {
        setFormData({
            username: "",
            password: "",
            role: "",
            email: ""
        });
    };

    return (
        <div className='editUserMainContainer'>
            <div className="editUserContainer">
                <div className="editUserHeadSection">
                    <h1>Edit System User</h1>
                    <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
                <div className="formContainer">
                    <form action="">

                        <div className='data'>
                            <label htmlFor="username">Username:</label>
                            <input type="text" name="username" value={formData.username} id="username" placeholder="Enter Username" onChange={handleInputChange} />
                        </div>
                        <div className='data'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" value={formData.password} id="password" placeholder='Enter Password' onChange={handleInputChange} />
                        </div>
                        <div className='data'>
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" value={formData.email} id="email" placeholder="Enter Email" onChange={handleInputChange} />
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
                            <button id="save" onClick={handleSubmit}>Save</button>
                            <button id="reset" onClick={handleReset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
