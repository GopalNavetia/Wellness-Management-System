import './EditMember.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/AxiosInstance.jsx'

export default function EditMember({ memberID }) {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let [formData, setFormData] = useState({
        name: "",
        dob: "",
        phone: "",
        address: "",
        pic: "",
        gender: ""
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
    // Fetch API
    // useEffect(() => {
    //     if (memberID) {
    //         axiosInstance.get(`/MyProject/EditMemberGetDataAPI?${memberID}`, {
    //             headers: { "ngrok-skip-browser-warning": "true" }
    //         })
    //             .then(response => {
    //                 setFormData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error("Failed to load member data:", error);
    //             });
    //     }
    // }, [memberID]);

    // Update API
    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/MyProject/EditMemberAPI?id=${memberID}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            })

            if (response.data.success) {
                // console.log(response.data);
                setFormData({ name: "", dob: "", phone: "", address: "", photo: "", gender: "" });
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
        console.log(formData);
        setFormData({
            name: "",
            dob: "",
            phone: "",
            address: "",
            pic: "",
            gender: ""
        });
    }

    return (
        <div className="editMemberContainer">
            <div className="editMemberHeadSection">
                <h1>Edit Member</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="formContainer">
                <div>
                    <label htmlFor="fullname">Full Name:</label><br />
                    <input type="text" name="name" value={formData.name} id="fullname" placeholder="Enter name" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input type="date" name="dob" value={formData.dob} id="dob" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor=" phone">Phone No.:</label><br />
                    <input type="text" name="phone" value={formData.phone} id="phone" placeholder="Enter Phone" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="address">Address:</label><br />
                    <input type="text" name="address" value={formData.address} id="address" placeholder="Enter Address" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="fileUpload">Choose Photo:</label>
                    <input type="file" name="pic" value={formData.pic} id="fileUpload" accept="image/*" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select name="gender" value={formData.gender} id="gender" onChange={handleInputChange}>
                        <option value="">Choose</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="buttonContainer">
                    <button id="save" onClick={handleSubmit}>Save</button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}