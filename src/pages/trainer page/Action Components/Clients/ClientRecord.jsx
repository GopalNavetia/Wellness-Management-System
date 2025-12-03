import './ClientRecord.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddClient from './AddClient';
import EditClient from './EditClient';
import { useNavigate, useRoutes, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance.jsx'

export default function ClientRecord() {
    // Backend data and UI loading state
    const { trainerID } = useParams();

    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(true);

    // Fetch Clients from backend
    useEffect(() => {
        async function fetchClients() {
            try {
                const result = await axiosInstance.get(`/MyProject/ClientTableAPI?id=${trainerID}`, {
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
    const handleAddButton = () => navigate(`addclient/${trainerID}`);
    const handleEditButton = () => {
        navigate(`editclient/${trainerID}`);
    };
    const handleDeleteButton = async (joinID) => {
        if (!window.confirm('Are you sure you want to delete this client?')) {
            return;
        }
        try {
            await axiosInstance.delete(`/MyProject/DeleteClientAPI?id=${joinID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            setFetchData(prevData => prevData.filter(client => client.join_id !== joinID));
        } catch (error) {
            console.log(error);
        }
    }

    const renderPageContent = () => (
        <div className='clientRecordContainer'>
            <div className='clientRecordHeadSection'>
                <h1>Client Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className='clientListContainer'>
                {loading ? (
                    <div>Loading client...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(fetchData) && fetchData.length > 0 ? (
                                fetchData.map((client) => {

                                    return (<tr key={client.join_id}>
                                        <td>{client.member_name}</td>
                                        <td>
                                            <button onClick={() => handleEditButton(client.join_id)}>Edit</button>
                                            <button onClick={() => handleDeleteButton(client.join_id)}>Delete</button>
                                        </td>
                                    </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center' }}>
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
            { path: ':trainerID/addclient/:trainerID', element: <AddClient /> },
            { path: ':trainerID/editclient/:trainerID', element: <EditClient /> }
        ]);
    };

    return <MembershipRecordRoutes />;
}