import './ProgressRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddProgressRecord from './AddProgressRecord'
import EditProgressRecord from './EditProgressRecord'
import ProgressLineChart from './ProgressLineChart'
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function ProgressRecord({ memberID }) {

    // Backend data and UI loading state
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user memberships
    useEffect(() => {
        async function fetchProgressData() {
            try {
                const result = await axiosInstance.get(`/MyProject/ProgressRecordFetchAPI?id=${memberID}`, {
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
        fetchProgressData();
    }, [memberID]);

    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(-1);
    const handleAddButton = () => navigate(`addprogress/${memberID}`);
    const handleEditButton = () => navigate(`editprogress/${memberID}`);
    // const handleDeleteButton = async (progressID) => {}

    const renderPageContent = () => (
        <div className="progressRecordContainer">
            <div className="progressRecordHeadSection">
                <h1>Progress Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className="progressListContainer">
                {loading ? (
                    <div>Loading progress...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Weight</th>
                                <th>Height</th>
                                <th>BMI</th>
                                <th>Fat%</th>
                                <th>Muscle%</th>
                                <th>Chest</th>
                                <th>Waist</th>
                                <th>Shoulder</th>
                                <th>Arms</th>
                                <th>Thighs</th>
                                <th>Back</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(fetchData) && fetchData.length > 0 ? (
                                fetchData.map((memberProgress) => (
                                    <tr key={memberProgress.id}>
                                        <td>{memberProgress.date}</td>
                                        <td>{memberProgress.weight}</td>
                                        <td>{memberProgress.height}</td>
                                        <td>{memberProgress.bmi}</td>
                                        <td>{memberProgress.fat_percent}</td>
                                        <td>{memberProgress.muscle_percent}</td>
                                        <td>{memberProgress.chest}</td>
                                        <td>{memberProgress.waist}</td>
                                        <td>{memberProgress.shoulder}</td>
                                        <td>{memberProgress.arms}</td>
                                        <td>{memberProgress.thighs}</td>
                                        <td>{memberProgress.back}</td>
                                        <td>
                                            <button onClick={handleEditButton}>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13" style={{ textAlign: 'center' }}>
                                        No progress data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );

    // Routes: always pass ID with location.state (or use params for scalability)
    const ProgressRecordRoutes = () => {
        return useRoutes([
            { path: '/', element: <>{renderPageContent()} <ProgressLineChart data={fetchData} /></> },
            { path: 'addprogress/:memberID', element: <AddProgressRecord /> },
            { path: 'editprogress/:memberID', element: <EditProgressRecord /> }
        ]);
    };

    return <ProgressRecordRoutes />;
}