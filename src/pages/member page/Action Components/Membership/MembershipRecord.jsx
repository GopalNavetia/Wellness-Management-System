import './MembershipRecord.css';
import MembershipData from '../../../../mocks/MembershipData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddMembership from './AddMembership';
import EditMembership from './EditMembership';
import PaymentDetails from './Payment/PaymentDetails';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackendURL from '../../../../utils/BackendURL'

export default function MembershipRecord({ memberID }) {
    // Track selected membership
    const [selectedMembershipId, setSelectedMembershipId] = useState(null);
    // Backend data and UI loading state
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user memberships
    useEffect(() => {
        async function fetchMemberships() {
            try {
                const result = await axios.get(`${BackendURL}/MyProject/MembershipDetail?id=${memberID}`, {
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
        fetchMemberships();
    }, [memberID]);

    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(-1);
    const handleAddButton = () => navigate('addmembership');
    const handleEditButton = (id) => {
        setSelectedMembershipId(id);
        navigate('editmembership');
    };

    // View/PaymentDetails navigation with mandatory ID check
    const handleViewButton = id => {
        if (!id) {
            alert('No membership selected');
            return;
        }
        setSelectedMembershipId(id);
        // Use search params to ensure robust passing (alternative: route param)
        navigate('paymentdetails', { state: { membershipID: id } });
    };

    // Render all memberships with actions
    const renderPageContent = () => (
        <div className='membershipRecordContainer'>
            <div className='membershipRecordHeadSection'>
                <h1>Membership Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>
            <div className='membershipListContainer'>
                {loading ? (
                    <div>Loading users...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(fetchData) && fetchData.length > 0 ? (
                                fetchData.map((membership) => (
                                    <tr key={membership.id}>
                                        <td>{membership.type}</td>
                                        <td>{membership.start_date}</td>
                                        <td>{membership.end_date}</td>
                                        <td>{new Date(membership.end_date) >= new Date() ? 'Active' : 'Expired'}</td>
                                        <td>{membership.fees}</td>
                                        <td>
                                            <button onClick={() => handleViewButton(membership.id)}>View</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleEditButton(membership.id)}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                                        No memberships found
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
    const MembershipRecordRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'addmembership', element: <><AddMembership />{renderPageContent()}</> },
            { path: 'editmembership', element: <><EditMembership />{renderPageContent()}</> },
            {
                path: 'paymentdetails/*',
                element: <PaymentDetails membershipID={selectedMembershipId} />
            }
        ]);
    };

    return <MembershipRecordRoutes />;
}
