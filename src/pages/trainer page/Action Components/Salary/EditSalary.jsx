import './EditSalary.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function EditSalary() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        pay_date: "",
        pay_salary_month: "",
        mode: "",
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
    const { salaryID } = useParams();

    useEffect(() => {
        if (salaryID) {
            axiosInstance.get(`/MyProject/EditGetSalaryAPI?id=${salaryID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            })
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error("Failed to load slot data:", error);
                });
        }
    }, [salaryID]);

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`/MyProject/EditSalaryAPI?id=${salaryID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.data.success) {
                alert("Edit Salary Successful.")
                handleReset();
                navigate(-1);
            } else {
                alert('Failed to edit salary: ' + response.data.message);
            }

        } catch (error) {
            console.error('API Request Error:', error.response ? error.response.data : error.message);
            alert(errorMessage);
        }
    };

    let handleReset = () => {
        setFormData({
            pay_date: "",
            pay_salary_month: "",
            mode: "",
            amount: ""
        });
    }

    return (
        <div className="editSalaryRecord">
            <div className="editSalaryRecordHeadSection">
                <h1>Edit Salary Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="formContainer">

                <div>
                    <label htmlFor="pay_date">Pay Date:</label><br />
                    <input type="date" name="pay_date" value={formData.pay_date} id="pay_date" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="pay_salary_month">Salary Month:</label>
                    <input type="text" name="pay_salary_month" value={formData.pay_salary_month} id="pay_salary_month" placeholder="Enter Salary Month" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="mode">Mode:</label>
                    <select name="mode" value={formData.mode} id="mode" onChange={handleInputChange}>
                        <option value="">Choose</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="amount">Amount:</label>
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