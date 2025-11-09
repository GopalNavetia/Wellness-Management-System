import './MembershipRecord.css';
import MembershipData from '../../../../mocks/MembershipData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddMembership from './AddMembership'
import EditMembership from './EditMembership'
import PaymentDetails from './Payment/PaymentDetails'
import { useNavigate, useRoutes } from 'react-router-dom';

export default function MembershipRecord({ memberID }) {
    // Filter membership records for that memberID
    let memberships = MembershipData.filter(membership => membership.memberID == memberID);

    const navigate = useNavigate();
    let handleCloseButton = () => navigate(-1)
    let handleAddButton = () => navigate('addmembership')
    let handleEditButton = () => navigate('editmembership')
    let handleViewButton = () => navigate('paymentdetails')


    // Render Page
    let renderPageContent = () => (
        <div className='membershipRecordContainer'>
            <div className='membershipRecordHeadSection'>
                <h1>Membership Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className='membershipListContainer'>
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
                        {memberships.length > 0 ? (
                            memberships.map((membership) => (
                                <tr key={membership.id}>
                                    <td>{membership.type}</td>
                                    <td>{membership.start_date}</td>
                                    <td>{membership.end_date}</td>
                                    <td>{new Date(membership.end_date) >= new Date() ? 'Active' : 'Expired'}</td>
                                    <td>{membership.fees}</td>
                                    <td><button onClick={handleViewButton}>View</button></td>
                                    <td><button onClick={handleEditButton}>Edit</button></td>
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
            </div>
        </div>
    )

    let MembershipRecordRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'addmembership', element: <><AddMembership />{renderPageContent()}</> },
            { path: 'editmembership', element: <><EditMembership />{renderPageContent()}</> },
            { path: 'paymentdetails/*', element: <PaymentDetails /> }
        ]);
    }

    return <MembershipRecordRoutes />
}
