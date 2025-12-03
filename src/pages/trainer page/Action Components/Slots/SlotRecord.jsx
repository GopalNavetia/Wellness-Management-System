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
    // const [fetchData, setFetchData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchData = [
        {
            slot_id: 1,
            label: "Morning Session",
            start_time: "07:00 AM",
            end_time: "08:00 AM"
        },
        {
            slot_id: 2,
            label: "Cardio Blast",
            start_time: "09:00 AM",
            end_time: "10:00 AM"
        },
        {
            slot_id: 3,
            label: "Lunch Break",
            start_time: "01:00 PM",
            end_time: "02:00 PM"
        },
        {
            slot_id: 4,
            label: "Evening Strength",
            start_time: "05:00 PM",
            end_time: "06:00 PM"
        },
        {
            slot_id: 5,
            label: "Night Yoga",
            start_time: "08:00 PM",
            end_time: "09:00 PM"
        }
    ];

    // Fetch Clients from backend
    // useEffect(() => {
    //     async function fetchClients() {
    //         try {
    //             const result = await axiosInstance.get(`/MyProject/SlotTableAPI?id=${trainerID}`, {
    //                 headers: { "ngrok-skip-browser-warning": "true" }
    //             });
    //             setFetchData(result.data || []);
    //         } catch (error) {
    //             console.log(error);
    //             setFetchData([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchClients();
    // }, [trainerID]);



    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(-1);
    const handleAddButton = () => navigate(`addslot/${trainerID}`);
    const handleEditButton = () => {
        navigate(`editslot/${trainerID}`);
    };
    const handleDeleteButton = async (slotID) => {
        if (!window.confirm('Are you sure you want to delete this slot?')) {
            return;
        }
        try {
            await axiosInstance.delete(`/MyProject/DeleteSlotAPI?id=${slotID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            setFetchData(prevData => prevData.filter(slot => slot.slot_id !== slotID));
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

                                    return (<tr key={slot.slot_id}>
                                        <td>{slot.label}</td>
                                        <td>{slot.start_time}</td>
                                        <td>{slot.end_time}</td>
                                        <td>
                                            <button onClick={() => handleEditButton(slot.slot_id)}>Edit</button>
                                            <button onClick={() => handleDeleteButton(slot.slot_id)}>Delete</button>
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
            { path: ':trainerID/editslot/:trainerID', element: <EditSlot /> }
        ]);
    };

    return <MembershipRecordRoutes />;
}