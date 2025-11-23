import './AddMembership.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function AddMembership() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        type: "",
        start_date: "",
        end_date: "",
        amount: ""
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
    const { memberID } = useParams();

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 💡 Sending formData as JSON. memberID is correctly passed in the URL.
            const response = await axiosInstance.post(`/MyProject/AddMembershipAPI?id=${memberID}`, formData, {
                headers: {
                    // This is the correct Content-Type for the Java Servlet's JSON parser
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            // Note: The backend uses 'status' not 'success' for the outcome key.
            if (response.data.status === 'success') {
                alert("Add Membership Successful.")
                setFormData({ type: "", start_date: "", end_date: "", amount: "" });
                navigate(-1);
            } else {
                // If backend returns a 'failed' status
                console.log("Form Data:", formData);
                alert('Failed to add membership: ' + response.data.message);
            }

        } catch (error) {
            // Handles network errors, timeouts, and non-2xx status codes (e.g., 400, 401, 500)
            console.error('API Request Error:', error.response ? error.response.data : error.message);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : 'A network or server error occurred.';
            alert(errorMessage);
        }
    };

    let handleReset = () => {
        setFormData({
            type: "",
            start_date: "",
            end_date: "",
            amount: ""
        });
    }

    return (
        <div className="addMembershipRecord">
            <div className="addMembershipRecordHeadSection">
                <h1>Add Membership Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="formContainer">
                {/* Your form structure remains the same */}
                <div>
                    <label htmlFor="type">Type:</label>
                    <select name="type" value={formData.type} id="type" onChange={handleInputChange}>
                        <option value="">Choose</option>
                        <option value="General">General</option>
                        <option value="PT">PT</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="start_date">Start Date:</label><br />
                    <input type="date" name="start_date" value={formData.start_date} id="start_date" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="end_date">End Date:</label><br />
                    <input type="date" name="end_date" value={formData.end_date} id="end_date" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="amount">Fee Amount:</label>
                    <input type="text" name="amount" value={formData.amount} id="amount" placeholder="Enter Amount" onChange={handleInputChange} />
                </div>

                <div className="buttonContainer">
                    <button id="save" onClick={handleSubmit}>Save</button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}