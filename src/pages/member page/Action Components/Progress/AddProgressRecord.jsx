import './AddProgressRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function AddProgressRecord() {
    const { memberID } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: "",
        weight: "",
        height: "",
        // bmi: "",
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
    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const newValue = e.target.value;

        setFormData((currData) => ({
            ...currData,
            [fieldName]: newValue
        }));
    };

    const handleClose = () => {
        navigate(-1);
    };

    const handleReset = () => {
        setFormData({
            date: "",
            weight: "",
            height: "",
            // bmi: "",
            fat_percent: "",
            muscle_percent: "",
            chest: "",
            waist: "",
            shoulder: "",
            arms: "",
            thighs: "",
            back: ""
        });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axiosInstance.post(
      `/MyProject/AddProgressAPI?id=${memberID}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    const data = response.data;

    if (data.success) {
      alert(data.message || 'Add Progress Successful.');
      handleReset();
      navigate(-1);
    } else {
      // backend returned success:false
      alert(data.message || 'Failed to add progress.');
    }
  } catch (error) {
    // backend returned non-2xx or network error
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message); // e.g. "All fields are required."
    } else {
      alert('An error occurred while saving progress.');
    }
    console.error(
      'API Request Error:',
      error.response ? error.response.data : error.message
    );
  }
};


    return (
        <div className="addProgressRecord">
            <div className="addProgressRecordHeadSection">
                <h1>Add Progress Record</h1>
                <span className='xMark' onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>

            <div className="formContainer">
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
                            <td><input type="number" name="weight" value={formData.weight} id="weight" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="height">Height</label></td>
                            <td><input type="number" step="0.1" name="height" value={formData.height} id="height" onChange={handleInputChange} /></td>
                        </tr>
                        {/* <tr>
                            <td><label htmlFor="bmi">BMI</label></td>
                            <td><input type="number" step="0.01" name="bmi" value={formData.bmi} id="bmi" onChange={handleInputChange} /></td>
                        </tr> */}
                        <tr>
                            <td><label htmlFor="fat_percent">Fat%</label></td>
                            <td><input type="number" step="0.1" name="fat_percent" value={formData.fat_percent} id="fat_percent" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="muscle_percent">Muscle%</label></td>
                            <td><input type="number" step="0.1" name="muscle_percent" value={formData.muscle_percent} id="muscle_percent" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="chest">Chest</label></td>
                            <td><input type="number" step="0.1" name="chest" value={formData.chest} id="chest" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="waist">Waist</label></td>
                            <td><input type="number" step="0.1" name="waist" value={formData.waist} id="waist" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="shoulder">Shoulder</label></td>
                            <td><input type="number" step="0.1" name="shoulder" value={formData.shoulder} id="shoulder" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="arms">Arms</label></td>
                            <td><input type="number" step="0.1" name="arms" value={formData.arms} id="arms" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="thighs">Thighs</label></td>
                            <td><input type="number" step="0.1" name="thighs" value={formData.thighs} id="thighs" onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="back">Back</label></td>
                            <td><input type="number" step="0.1" name="back" value={formData.back} id="back" onChange={handleInputChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttonContainer">
                    <button onClick={handleSubmit}>Save</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}
