import './SlotRecord.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddSlot from './AddSlot';
import EditSlot from './EditSlot';
import { useNavigate, useRoutes, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function SlotRecord() {
    // Backend data and UI loading state
    const { trainerID } = useParams();
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Clients from backend
    useEffect(() => {
        async function fetchClients() {
            try {
                const result = await axiosInstance.get(`/MyProject/SlotRecordAPI?trainer_id=${trainerID}`, {
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
        fetchClients();
    }, [trainerID]);

    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}`);
    const handleAddButton = () => navigate(`addslot/${trainerID}`);
    const handleEditButton = (scheduleID) => {
        navigate(`editslot/${scheduleID}`);
    };
    const handleDeleteButton = async (scheduleID) => {
        if (!window.confirm('Are you sure you want to delete this slot?')) {
            return;
        }
        try {
            await axiosInstance.delete(`/MyProject/DeleteSlotAPI?schedule_id=${scheduleID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            setFetchData(prevData => prevData.filter(slot => slot.schedule_id !== scheduleID));
        } catch (error) {
            console.log(error);
        }
    }

    const renderPageContent = () => (
        <div className='slotRecordContainer'>
            <div className='slotRecordHeadSection'>
                <h1>Slot Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className='slotListContainer'>
                {loading ? (
                    <div>Loading slots...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(fetchData) && fetchData.length > 0 ? (
                                fetchData.map((slot) => {

                                    return (<tr key={slot.schedule_id}>
                                        <td>{slot.label}</td>
                                        <td>{slot.start_time}</td>
                                        <td>{slot.end_time}</td>
                                        <td>
                                            <button onClick={() => handleEditButton(slot.schedule_id)}>Edit</button>
                                            <button onClick={() => handleDeleteButton(slot.schedule_id)}>Delete</button>
                                        </td>
                                    </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                        No clients found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );

    const MembershipRecordRoutes = () => {
        return useRoutes([
            { path: '/:trainerID', element: renderPageContent() },
            { path: ':trainerID/addslot/:trainerID', element: <AddSlot /> },
            { path: ':trainerID/editslot/:scheduleID', element: <EditSlot /> }
        ]);
    };

    return <MembershipRecordRoutes />;
}