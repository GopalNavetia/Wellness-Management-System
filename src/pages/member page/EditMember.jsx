import './EditMember.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function EditMember() {

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

    let handleSubmit = (e) => {
        e.preventDefault();

        setFormData({
            name: "",
            dob: "",
            phone: "",
            address: "",
            pic: "",
            gender: ""
        });
        // Cannot chnage in MockData as it is static file i need backend for change in runtime.
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