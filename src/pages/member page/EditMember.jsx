import './EditMember.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance.jsx'

// Takes a File object (from <input type="file">)
// Returns a Promise that resolves to a compressed base64 data URL
async function compressImage(file, maxWidth = 400, maxHeight = 400, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const img = new Image();           // will hold the picture in memory
        const reader = new FileReader();  // reads the file from disk

        // 1) Read the file as base64 so <img> can load it
        reader.onload = e => {
            img.onload = () => {
                // 2) Calculate new width/height while keeping aspect ratio
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                // 3) Create a hidden canvas and draw scaled image
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // 4) Ask canvas to give us a compressed JPEG blob
                canvas.toBlob(
                    blob => {
                        if (!blob) return reject(new Error('Compression failed'));

                        // 5) Convert that blob to base64 data URL
                        const reader2 = new FileReader();
                        reader2.onloadend = () => resolve(reader2.result); // data:image/jpeg;base64,...
                        reader2.readAsDataURL(blob);
                    },
                    'image/jpeg',  // output format
                    quality         // 0.0–1.0 (lower = smaller file)
                );
            };

            img.onerror = () => reject(new Error('Image load error'));
            img.src = e.target.result; // base64 from first FileReader
        };

        reader.onerror = () => reject(new Error('File read error'));
        reader.readAsDataURL(file);  // start reading original file
    });
}

export default function EditMember({ memberID }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "", dob: "", phone: "", address: "", photo: "", gender: ""
    });
    const [selectedPhotoName, setSelectedPhotoName] = useState(""); // Photo filename
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

    // Handle text inputs + conditional compression based on original size
    const handleInputChange = (e) => {
        const fieldName = e.target.name;

        if (fieldName === 'photo') {
            const file = e.target.files[0];

            if (!file) {
                setFormData(prev => ({ ...prev, photo: "" }));
                setSelectedPhotoName("");
                return;
            }

            if (file.size > 8 * 1024 * 1024) {
                alert('Original photo must be under 8MB');
                e.target.value = '';
                return;
            }

            const sizeMB = file.size / (1024 * 1024);

            // No compression for files under 0.5 MB
            if (sizeMB <= 0.5) {
                const reader = new FileReader();
                reader.onload = e => {
                    setFormData(prev => ({ ...prev, photo: e.target.result }));
                    setSelectedPhotoName(file.name);
                };
                reader.readAsDataURL(file);
                return;
            }

            // Set compression settings based on file size
            let compressionSettings = { maxWidth: 400, maxHeight: 400, quality: 0.7 };

            if (sizeMB > 0.5 && sizeMB <= 1.5) {
                compressionSettings = { maxWidth: 800, maxHeight: 800, quality: 0.7 };
            } else if (sizeMB > 1.5 && sizeMB <= 3) {
                compressionSettings = { maxWidth: 1200, maxHeight: 1200, quality: 0.6 };
            } else if (sizeMB > 3 && sizeMB <= 5) {
                compressionSettings = { maxWidth: 1600, maxHeight: 1600, quality: 0.5 };
            } else if (sizeMB > 5 && sizeMB <= 8) {
                compressionSettings = { maxWidth: 2000, maxHeight: 2000, quality: 0.4 };
            }

            setSelectedPhotoName(file.name);
            setIsLoadingPhoto(true);

            compressImage(file, compressionSettings.maxWidth, compressionSettings.maxHeight, compressionSettings.quality)
                .then((compressedDataUrl) => {
                    const approxBytes = Math.ceil((compressedDataUrl.length * 3) / 4);
                    const approxKB = Math.round(approxBytes / 1024);
                    console.log(`Compressed size ≈ ${approxKB} KB`);

                    if (approxKB > 500) {
                        alert(`Compressed image is still too large (~${approxKB} KB). Please choose a smaller image.`);
                        e.target.value = '';
                        setSelectedPhotoName('');
                        setFormData(prev => ({ ...prev, photo: "" }));
                        return;
                    }

                    setFormData(prev => ({
                        ...prev,
                        photo: compressedDataUrl
                    }));
                })
                .catch((err) => {
                    console.error(err);
                    alert('Error while compressing image');
                    e.target.value = '';
                    setSelectedPhotoName('');
                    setFormData(prev => ({ ...prev, photo: "" }));
                })
                .finally(() => {
                    setIsLoadingPhoto(false);
                });

        } else {
            setFormData(prev => ({
                ...prev,
                [fieldName]: e.target.value
            }));
        }
    };

    // Fetch existing member data
    useEffect(() => {
        if (memberID) {
            axiosInstance.get(`/MyProject/MemberDetail?id=${memberID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            })
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error("Failed to load member data:", error);
                });
        }
    }, [memberID]);

    // ✅ Pure JSON with Base64
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(
                `/MyProject/EditMemberAPI?id=${memberID}`,
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
                alert('Failed to edit member: ' + response.data.message);
            }
        } catch (error) {
            console.error('Submit error:', error);
            if (error.response?.data?.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Failed to edit member (network error)');
            }
        }
    };

    const handleReset = () => {
        setFormData({ name: "", dob: "", phone: "", address: "", photo: "", gender: "" });
        setSelectedPhotoName("");
    };

    return (
        <div className="editMemberContainer">
            <div className="editMemberHeadSection">
                <h1>Edit Member</h1>
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
