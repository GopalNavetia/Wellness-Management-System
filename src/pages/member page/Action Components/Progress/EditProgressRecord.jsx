import './EditProgressRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function EditProgressRecord() {

    let [formData, setFormData] = useState({
        date: "",
        weight: "",
        height: "",
        fat_percent: "",
        muscle_percent: "",
        chest: "",
        waist: "",
        shoulder: "",
        arms: "",
        thighs: "",
        back: ""
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

    const navigate = useNavigate();

    let handleClose = () => {
        navigate(-1)
    };

    let handleReset = () => {
        setFormData({
            date: "",
            weight: "",
            height: "",
            fat_percent: "",
            muscle_percent: "",
            chest: "",
            waist: "",
            shoulder: "",
            arms: "",
            thighs: "",
            back: ""
        });
    }

    // Backend API Call
    const { progressID } = useParams();

    // //  Fetch API
    useEffect(() => {
        if (progressID) {
            axiosInstance.get(`/MyProject/EditGetProgressAPI?id=${progressID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            })
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error("Failed to load progress data:", error);
                });
        }
    }, [progressID]);

    // Edit API
    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(
                `/MyProject/EditProgressAPI?id=${progressID}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );

            // Backend: { success: true/false, message: "..." }
            if (response.data.success === true) {
                alert(response.data.message || "Edit Progress Successful.");
                handleReset();
                navigate(-1);
            } else {
                alert('Failed to edit progress: ' + (response.data.message || 'Unknown error'));
            }

        } catch (error) {
            console.error(
                'API Request Error:',
                error.response ? error.response.data : error.message
            );

            // Use message from backend for non-2xx responses
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Error while editing progress.');
            }
        }
    };

    return (
        <div className="editProgressRecord">
            <div className="editProgressRecordHeadSection">
                <h1>Edit Progress Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div class="formContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Body Measurements</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><label htmlFor="date">Date</label></td>
                            <td><input type="date" name="date" value={formData.date} id="date" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="weight">Weight</label></td>
                            <td><input type="text" name="weight" value={formData.weight} id="weight" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="height">Height</label></td>
                            <td><input type="text" name="height" value={formData.height} id="height" onChange={handleInputChange} /></td>
                        </tr>
                        {/* <tr>
                            <td><label htmlFor="bmi">BMI</label></td>
                            <td><input type="text" name="bmi" value={formData.bmi} id="bmi" onChange={handleInputChange} /></td>
                        </tr> */}
                        <tr>
                            <td><label htmlFor="fat_percent">Fat%</label></td>
                            <td><input type="text" name="fat_percent" value={formData.fat_percent} id="fat_percent" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="muscle_percent">Muscle%</label></td>
                            <td><input type="text" name="muscle_percent" value={formData.muscle_percent} id="muscle_percent" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="chest">Chest</label></td>
                            <td><input type="text" name="chest" value={formData.chest} id="chest" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="waist">Waist</label></td>
                            <td><input type="text" name="waist" value={formData.waist} id="waist" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="shoulder">Shoulder</label></td>
                            <td><input type="text" name="shoulder" value={formData.shoulder} id="shoulder" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="arms">Arms</label></td>
                            <td><input type="text" name="arms" value={formData.arms} id="arms" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="thighs">Thighs</label></td>
                            <td><input type="text" name="thighs" value={formData.thighs} id="thighs" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="back">Back</label></td>
                            <td><input type="text" name="back" value={formData.back} id="back" onChange={handleInputChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttonContainer">
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div >
    );
}