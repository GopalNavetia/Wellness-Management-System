import './AddSlot.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function AddSlot() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        label: "",
        start_time: "",
        end_time: ""
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
            const response = await axiosInstance.post(`/MyProject/AddSlotAPI?id=${trainerID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.data.success) {
                alert("Add Slot Successful.")
                setFormData({
                    label: "",
                    start_time: "",
                    end_time: ""
                });
                navigate(-1);
            } else {
                alert('Failed to add slot: ' + response.data.message);
            }

        } catch (error) {
            console.error('API Request Error:', error.response ? error.response.data : error.message);
            alert(errorMessage);
        }
    };

    let handleReset = () => {
        setFormData({
            label: "",
            start_time: "",
            end_time: ""
        });
    }

    return (
        <div className="addSlotRecord">
            <div className="addSlotRecordHeadSection">
                <h1>Add Slot Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="formContainer">

                <div>
                    <label htmlFor="label">Label:</label><br />
                    <input type="text" name="label" value={formData.label} id="label" placeholder="eg. morning, evening" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="start_time">Start Time:</label>
                    <input type="time" name="start_time" value={formData.start_time} id="start_time" placeholder="Enter Time" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="end_time">End Time:</label>
                    <input type="time" name="end_time" value={formData.end_time} id="end_time" placeholder="Enter Time" onChange={handleInputChange} />
                </div>

                <div className="buttonContainer">
                    <button id="save" onClick={handleSubmit}>Save</button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}