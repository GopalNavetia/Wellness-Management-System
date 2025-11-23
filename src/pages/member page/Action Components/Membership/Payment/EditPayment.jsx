import './EditPayment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../../../utils/AxiosInstance.jsx'

export default function EditPayment() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        mode: "",
        pay_date: "",
        due_date: "",
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
    const { membershipID, payID } = useParams();

    // // Fetch API
    // useEffect(() => {
    //     if (payID) {
    //         axiosInstance.get(`/MyProject/EditMemberGetDataAPI?id=${payID}`, {
    //             headers: { "ngrok-skip-browser-warning": "true" }
    //         })
    //             .then(response => {
    //                 setFormData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error("Failed to load payment data:", error);
    //             });
    //     }
    // }, [payID]);

    // Update API
    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/MyProject/EditPaymentAPI?id=${payID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            })

            if (response.data.success) {
                // console.log(response.data);
                setFormData({ mode: "", pay_date: "", due_date: "", amount: "" });
                navigate(-1);
            } else {
                console.log(formData)
                alert('Failed to edit member: ' + response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Failed to edit member (network/server error).');
            }
            console.error(error);
        }
    };

    let handleReset = () => {
        setFormData({
            mode: "",
            pay_date: "",
            due_date: "",
            amount: ""
        });
    }

    return (
        <div className="editPayment">
            <div className="editPaymentHeadSection">
                <h1>Edit Payment</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="formContainer">
                <div>
                    <label htmlFor="pay_date">Pay Date:</label><br />
                    <input type="date" name="pay_date" value={formData.pay_date} id="pay_date" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" name="amount" value={formData.amount} id="amount" placeholder="Enter Amount" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="mode">Mode:</label><br />
                    <select name="mode" value={formData.mode} id="mode" onChange={handleInputChange}>
                        <option value="">Choose</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="due_date">Due Date:</label><br />
                    <input type="date" name="due_date" value={formData.due_date} id="due_date" onChange={handleInputChange} />
                </div>


                <div className="buttonContainer">
                    <button id="save" onClick={handleSubmit}>Save</button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}