import './EditUser.css'
import UserData from '../../mocks/UsersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditUser() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        email: ""
    });

    let storedUser = UserData;

    // Common Input Change
    let handleInputChange = (e) => {
        let fieldName = e.target.name;
        let newValue = e.target.value;

        setFormData((currData) => {
            return {
                ...currData,
                [fieldName]: newValue
            }
        });
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        setFormData({
            username: "",
            password: "",
            role: "",
            email: ""
        });
    };


    let handleReset = () => {
        setFormData({
            username: "",
            password: "",
            role: "",
            email: ""
        });
    }

    return (
        <div className='editUserMainContainer'>

            <div className="editUserContainer">
                <div className="editUserHeadSection">
                    <h1>Edit System User</h1>
                    <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
                </div>

                <div className="formContainer">
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
                            <option value="Admin">Admin</option>
                            <option value="Therapist">Therapist</option>
                        </select>
                    </div>

                    <div className="buttonContainer">
                        <button id="save" onClick={handleSubmit}>Save</button>
                        <button id="reset" onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}