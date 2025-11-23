import './EditWorkoutPlan.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function EditWorkoutPlan() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
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
    const { workoutID } = useParams();

    // Fetch user data when component mounts or username changes
    // useEffect(() => {
    //     if (workoutID) {
    //         axiosInstance.get(`/MyProject/WorkoutRecordAPI?id=${workoutID}`, {
    //             headers: { "ngrok-skip-browser-warning": "true" }
    //         })
    //             .then(response => {
    //                 setFormData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error("Failed to load workout plan data:", error);
    //             });
    //     }
    // }, [workoutID]);

    // Submit API
    let handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form Data:", formData);
        try {
            const response = await axiosInstance.post(`/MyProject/EditWorkoutAPI?id=${workoutID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            // Adjusted to check for success field in response consistently
            if (response.data.success === true) {
                alert("Edit Workout Plan Successful.");
                setFormData({ start_date: "", end_date: "", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" });
                navigate(-1);
            } else {
                alert('Failed to Edit Workout Plan: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('API Request Error:', error.response ? error.response.data : error.message);

            // Extract detailed error info for debug from backend response
            let errorMessage = 'A network or server error occurred.';
            if (error.response && error.response.data) {
                const data = error.response.data;
                if (data.error) errorMessage = data.error;
                if (data.exception) errorMessage += `\nException: ${data.exception}`;
                if (data.stackTraceString) errorMessage += `\nStackTrace:\n${data.stackTraceString}`;
            }

            alert(errorMessage);
        }
    };


    let handleReset = () => {
        setFormData({ start_date: "", end_date: "", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" });
    }

    return (
        <div className="editWorkout">
            <div className="editWorkoutHeadSection">
                <h1>Edit Workout Plan</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div class="formContainer">
                <div class="dateContainer">
                    <label htmlFor="start_date">From: <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} id="start_date" /></label>
                    <label htmlFor="end_date">To: <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} id="end_date" /></label>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Workout</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td><label htmlFor="monday">Monday</label></td>
                            <td><input type="text" name="monday" value={formData.monday} onChange={handleInputChange} id="monday" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="tuesday">Tuesday</label></td>
                            <td><input type="text" name="tuesday" value={formData.tuesday} onChange={handleInputChange} id="tuesday" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="wednesday">Wednesday</label></td>
                            <td><input type="text" name="wednesday" value={formData.wednesday} onChange={handleInputChange} id="wednesday" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="thursday">Thursday</label></td>
                            <td><input type="text" name="thursday" value={formData.thursday} onChange={handleInputChange} id="thursday" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="friday">Friday</label></td>
                            <td><input type="text" name="friday" value={formData.friday} onChange={handleInputChange} id="friday" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="saturday">Saturday</label></td>
                            <td><input type="text" name="saturday" value={formData.saturday} onChange={handleInputChange} id="saturday" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="sunday">Sunday</label></td>
                            <td><input type="text" name="sunday" value={formData.sunday} onChange={handleInputChange} id="sunday" /></td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}