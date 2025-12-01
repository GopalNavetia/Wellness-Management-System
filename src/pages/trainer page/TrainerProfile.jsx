import './TrainerProfile.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useRoutes, useParams } from 'react-router-dom';
import EditTrainer from './EditTrainer';
import TrainerActionContainer from './TrainerActionContainer';
import axiosInstance from '../../utils/AxiosInstance.jsx'

export default function TrainerProfile() {
    const navigate = useNavigate();
    const { trainerID } = useParams();
    // API base URL
    // const [fetchData, setFetchData] = useState(null);
    // const [loading, setLoading] = useState(true);

    // Fetch data from backend
    // useEffect(() => {
    //     async function fetchTrainerData() {
    //         try {
    //             const response = await axiosInstance.get(`/MyProject/TrainerDetail?id=${trainerID}`, {
    //                 headers: {
    //                     "ngrok-skip-browser-warning": "true"
    //                 }
    //             });
    //             console.log(response.data)
    //             setFetchData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching trainer data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchTrainerData();
    // }, [trainerID]);

    // if (loading) {
    //     return <p style={{ textAlign: 'center' }}>Loading...</p>;
    // }

    // if (!fetchData) {
    //     return <p>No trainer data found.</p>;
    // }

    // MOCK DATA
    let fetchData = {
        name: "Rahul Sharma",
        gender: "Male",
        dob: "1998-05-12",
        phone: "9876543210",
        specialization: "Strength & Conditioning",
        certification: "Certified Personal Trainer (CPT)",
        address: "Dwarka, New Delhi",
        status: "Active",
        photo: "https://via.placeholder.com/150", // sample image URL
    };

    const handleClose = () => navigate(-1);
    const handleEditButton = (trainerID) => navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}/edittrainer/${trainerID}`);
    let handleDeleteButton = async (trainerID, name) => {
        // Ask for confirmation
        const ok = window.confirm(`Are you sure you want to delete trainer: "${name}"?`);

        // If user clicks Cancel, just return
        if (!ok) return;

        try {
            const response = await axiosInstance.delete(`/MyProject/DeleteTrainerAPI?id=${trainerID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (response.data.success) {
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Trainer Profile Content
    const renderProfileContent = () => (
        <div className="trainerProfileContainer">
            <div className="trainerProfileHeadSection">
                <h1>Trainer Profile</h1>
                <span className="xMark" onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>

            <div className="profile">
                <div className="data">
                    <h2>{fetchData.name}</h2>
                    <p><b>Gender:</b> {fetchData.gender}</p>
                    <p><b>Date of Birth:</b> {fetchData.dob}</p>
                    <p><b>Phone No:</b> {fetchData.phone}</p>
                    <p><b>Specialization:</b> {fetchData.specialization}</p>
                    <p><b>Certification:</b> {fetchData.certification}</p>
                    <p><b>Address:</b> {fetchData.address}</p>
                    <p><b>Status:</b> {fetchData.status}</p>
                    <div className="buttons">
                        <button onClick={() => handleEditButton(trainerID)}>Edit</button>
                        <button onClick={() => handleDeleteButton(trainerID, fetchData.name)}>Delete</button>
                    </div>
                </div>
                <div className="imgSection"><img src={fetchData.photo} alt={fetchData.name} /></div>

            </div>

            <TrainerActionContainer />
        </div>
    );

    const TrainerProfileRoutes = () => {
        return useRoutes([
            { path: '/*', element: renderProfileContent() },
            {
                path: 'edittrainer/:trainerID',
                element: (
                    <>
                        <EditTrainer />
                    </>
                ),
            },
        ]);
    };

    return <TrainerProfileRoutes />;
}
