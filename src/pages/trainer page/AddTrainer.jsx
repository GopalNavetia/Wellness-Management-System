import './AddTrainer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/AxiosInstance.jsx'

export default function AddTrainer() {

    const navigate = useNavigate();

    let [formData, setFormData] = useState({
        name: "",
        gender: "",
        dob: "",
        address: "",
        phone: "",
        photo: "",
        specialization: "",
        certification: "",
    });

    const [selectedPhotoName, setSelectedPhotoName] = useState(""); // Photo filename
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

    // ✅ Handle text inputs + Base64 photo conversion + filename
    const handleInputChange = (e) => {
        const fieldName = e.target.name;

        if (fieldName === 'photo') {
            const file = e.target.files[0];

            if (file && file.size > 2 * 1024 * 1024) {
                alert('Photo must be under 2MB');
                e.target.value = ''; // Clear input
                return;
            }

            if (file) {
                setSelectedPhotoName(file.name); // Store filename
                setIsLoadingPhoto(true);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFormData(prev => ({
                        ...prev,
                        photo: e.target.result  // Base64 string
                    }));
                    setIsLoadingPhoto(false);
                };
                reader.onerror = () => {
                    alert('Error reading file');
                    setIsLoadingPhoto(false);
                };
                reader.readAsDataURL(file);
            } else {
                setFormData(prev => ({ ...prev, photo: "" }));
                setSelectedPhotoName("");
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [fieldName]: e.target.value
            }));
        }
    };


    // ✅ Pure JSON with Base64
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(
                `/MyProject/AddTrainerAPI`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );

            if (response.data.success) {
                alert(response.data.message);
                navigate(-1);
            } else {
                alert('Failed to add trainer: ' + response.data.message);
            }
        } catch (error) {
            console.error('Submit error:', error);
            if (error.response?.data?.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Failed to add trainer (network error)');
            }
        }
    };

    let handleReset = () => {
        setFormData({
            name: "",
            gender: "",
            dob: "",
            address: "",
            phone: "",
            photo: "",
            specialization: "",
            certification: "",
        });
        setSelectedPhotoName("");
    }

    return (
        <div className="addTrainerContainer">
            <div className="addTrainerHeadSection">
                <h1>Add Trainer</h1>
                <span className='xMark' onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>

            <form className="formContainer" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullname">Full Name:</label><br />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        id="fullname"
                        placeholder="Enter name"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        id="dob"
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="phone">Phone No.:</label><br />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        id="phone"
                        placeholder="Enter Phone"
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="address">Address:</label><br />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        id="address"
                        placeholder="Enter Address"
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="fileUpload">Choose Photo:</label><br />
                    <input
                        type="file"
                        name="photo"
                        id="fileUpload"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                    {selectedPhotoName && (
                        <div style={{ marginTop: '5px' }}>
                            <small>✅ Selected: {selectedPhotoName}</small>
                        </div>
                    )}
                    {isLoadingPhoto && (
                        <div style={{ marginTop: '5px' }}>
                            <small>⏳ Converting photo...</small>
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select name="gender" value={formData.gender} id="gender" onChange={handleInputChange}>
                        <option value="">Choose</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="specialization">Specialization:</label><br />
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        id="specialization"
                        placeholder="Enter Specialization"
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="certification">Certification:</label><br />
                    <input
                        type="text"
                        name="certification"
                        value={formData.certification}
                        id="certification"
                        placeholder="Enter Certification"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="buttonContainer">
                    <button type="submit" disabled={isLoadingPhoto}>
                        {isLoadingPhoto ? 'Processing...' : 'Save'}
                    </button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}