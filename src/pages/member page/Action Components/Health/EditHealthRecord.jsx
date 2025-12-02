import './EditHealthRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function EditHealthRecord() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        medical_history: "",
        current_medication: "",
        allergy: "",
        surgery: "",
        injury: "",
        supplement: "",
        diet_preference: "",
        drink: "",
        smoke: ""
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

    // //  Fetch API
    useEffect(() => {
        if (memberID) {
            axiosInstance.get(`/MyProject/EditGetHealthAPI?id=${memberID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            })
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error("Failed to load health record data:", error);
                });
        }
    }, [memberID]);

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/MyProject/EditHealthRecordAPI?Member_ID=${memberID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.data.success) {
                alert("Edit Health Record Successful.")
                handleReset();
                navigate(-1);
            } else {
                alert('Failed to edit health record: ' + response.data.message);
            }

        } catch (error) {
            console.error('API Request Error:', error.response ? error.response.data : error.message);
            alert(errorMessage);
        }
    };

    let handleReset = () => {
        setFormData({
            medical_history: "",
            current_medication: "",
            allergy: "",
            surgery: "",
            injury: "",
            supplement: "",
            diet_preference: "",
            drink: "",
            smoke: ""
        });
    }

    return (
        <div className="editHealthRecord">
            <div className="editHealthRecordHeadSection">
                <h1>Edit Health Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div class="formContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td><label htmlFor="medical_history">Medical History</label></td>
                            <td><input type="text" name="medical_history" value={formData.medical_history} onChange={handleInputChange} id="medical_history" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="current_medication">Current Medication</label></td>
                            <td><input type="text" name="current_medication" value={formData.current_medication} onChange={handleInputChange} id="current_medication" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="allergy">Allergy</label></td>
                            <td><input type="text" name="allergy" value={formData.allergy} onChange={handleInputChange} id="allergy" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="surgery">Surgery</label></td>
                            <td><input type="text" name="surgery" value={formData.surgery} onChange={handleInputChange} id="surgery" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="injury">Injury</label></td>
                            <td><input type="text" name="injury" value={formData.injury} onChange={handleInputChange} id="injury" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="supplement">Supplement</label></td>
                            <td><input type="text" name="supplement" value={formData.supplement} onChange={handleInputChange} id="supplement" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="diet_preference">Diet Preference</label></td>
                            <td><input type="text" name="diet_preference" value={formData.diet_preference} onChange={handleInputChange} id="diet_preference" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="drink">Drink</label></td>
                            <td><input type="text" name="drink" value={formData.drink} onChange={handleInputChange} id="drink" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="smoke">Smoke</label></td>
                            <td><input type="text" name="smoke" value={formData.smoke} onChange={handleInputChange} id="smoke" /></td>
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