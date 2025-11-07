import './AddMembership.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddMembership() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        type: "",
        start_date: "",
        end_date: "",
        fees: ""
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

    let handleSubmit = (e) => {
        e.preventDefault();

        setFormData({
            type: "",
            start_date: "",
            end_date: "",
            fees: ""
        });
        // Cannot chnage in MockData as it is static file i need backend for change in runtime.
    };

    let handleReset = () => {
        setFormData({
            type: "",
            start_date: "",
            end_date: "",
            fees: ""
        });
    }

    return (
        <div className="addMembershipRecord">
            <div className="addMembershipRecordHeadSection">
                <h1>Add Membership Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="formContainer">
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
                    <label htmlFor="fees">Fee Amount:</label>
                    <input type="text" name="fees" value={formData.fees} id="fees" placeholder="Enter Amount" />
                </div>

                <div className="buttonContainer">
                    <button id="save" onClick={handleSubmit}>Save</button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}