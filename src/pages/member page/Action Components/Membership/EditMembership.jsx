import './EditMembership.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx';

export default function EditMembership() {

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

    // Backend API
    const { membershipID } = useParams();

    // Fetch API
    // useEffect(() => {
    //     if (membershipID) {
    //         axiosInstance.get(`/MyProject/EditMemberGetDataAPI?id=${membershipID}`, {
    //             headers: { "ngrok-skip-browser-warning": "true" }
    //         })
    //             .then(response => {
    //                 setFormData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error("Failed to load membership data:", error);
    //             });
    //     }
    // }, [membershipID]);

    // Update API
    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/MyProject/EditMembershipAPI?id=${membershipID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            })

            if (response.data.success) {
                // console.log(response.data);
                setFormData({ type: "", start_date: "", end_date: "", amount: "" });
                navigate(-1);
            } else {
                console.log(formData)
                alert('Failed to edit membership: ' + response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Failed to edit membership (network/server error).');
            }
            console.error(error);
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
        <div className="editMembershipRecord">
            <div className="editMembershipRecordHeadSection">
                <h1>Edit Membership Record</h1>
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