import './HealthRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddHealthRecord from './AddHealthRecord'
import EditHealthRecord from './EditHealthRecord'
import { useNavigate, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axiosInstance from '../../../../utils/AxiosInstance.jsx'


export default function HealthRecord({ memberID }) {

    // Backend data and UI loading state
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHealthData() {
            try {
                const result = await axiosInstance.get(`/MyProject/HealthRecordFetchAPI?id=${memberID}`, {
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                setFetchData(result.data || []);
            } catch (error) {
                console.log(error);
                setFetchData([]);
            } finally {
                setLoading(false);
            }
        }
        fetchHealthData();
    }, [memberID]);

    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(-1);
    const handleAddButton = (memberID) => navigate(`addhealthrecord/${memberID}`);
    const handleEditButton = (memberID) => navigate(`edithealthrecord/${memberID}`);
    let handleDeleteButton = async (memberID) => {
        // Ask for confirmation
        const ok = window.confirm("Are you sure you want to delete health record ?");

        // If user clicks Cancel, just return
        if (!ok) return;

        try {
            const response = await axiosInstance.delete(`/MyProject/DeleteHealthRecordAPI?member_id=${memberID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (response.data.success) {
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Render Page
    const renderPageContent = () => (
        <div className="healthRecord">
            <div className="healthRecordHeadSection">
                <h1>Health Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={() => handleAddButton(memberID)}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className="healthTableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><strong>Medical History</strong></td>
                            <td>{fetchData.medical_history}</td>
                        </tr>
                        <tr>
                            <td><strong>Current Medication</strong></td>
                            <td>{fetchData.current_medication}</td>
                        </tr>
                        <tr>
                            <td><strong>Allergy</strong></td>
                            <td>{fetchData.allergy}</td>
                        </tr>
                        <tr>
                            <td><strong>Surgery</strong></td>
                            <td>{fetchData.surgery}</td>
                        </tr>
                        <tr>
                            <td><strong>Injury</strong></td>
                            <td>{fetchData.injury}</td>
                        </tr>
                        <tr>
                            <td><strong>Supplement</strong></td>
                            <td>{fetchData.supplement}</td>
                        </tr>
                        <tr>
                            <td><strong>Diet Preference</strong></td>
                            <td>{fetchData.diet_preference}</td>
                        </tr>
                        <tr>
                            <td><strong>Drink</strong></td>
                            <td>{fetchData.drink}</td>
                        </tr>
                        <tr>
                            <td><strong>Smoke</strong></td>
                            <td>{fetchData.smoke}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="buttonContainer">
                    <button onClick={() => handleEditButton(memberID)}>Edit</button>
                    <button onClick={() => handleDeleteButton(memberID)}>Delete</button>
                </div>

            </div>
        </div>
    );

    // Workout Plan Page Routes
    const HealthRecordRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'addhealthrecord/:memberID', element: <AddHealthRecord /> },
            { path: 'edithealthrecord/:memberID', element: <EditHealthRecord /> },
        ]);
    };

    return <HealthRecordRoutes />
}