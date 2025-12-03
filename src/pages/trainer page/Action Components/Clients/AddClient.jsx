import './AddClient.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function AddClient() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        name: "",
        phone: ""
    });

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


    // Backend API Call
    const { trainerID } = useParams();

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`/MyProject/AddClientAPI?trainer_id=${trainerID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.data.success) {
                alert("Add Client Successful.")
                setFormData({ name: "", phone: "" });
                navigate(-1);
            } else {
                alert('Failed to add client: ' + response.data.message);
            }

        } catch (error) {
            const msg =
                error.response?.data?.message || // e.g. "Member not found"
                error.message ||
                "Something went wrong";
            console.error('API Request Error:', msg);
            alert(msg);
        }
    };

    let handleReset = () => {
        setFormData({
            name: "",
            phone: ""
        });
    }

    return (
        <div className="addClientRecord">
            <div className="addClientRecordHeadSection">
                <h1>Add Client Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="formContainer">

                <div>
                    <label htmlFor="name">Member Name:</label><br />
                    <input type="text" name="name" value={formData.name} id="name" placeholder="Enter Name" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" name="phone" value={formData.phone} id="phone" placeholder="Enter Amount" onChange={handleInputChange} />
                </div>

                <div className="buttonContainer">
                    <button id="save" onClick={handleSubmit}>Save</button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}