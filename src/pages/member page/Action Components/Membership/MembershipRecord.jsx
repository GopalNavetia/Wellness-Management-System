import './MembershipRecord.css';
import MembershipData from '../../../../mocks/MembershipData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MembershipRecord({ memberID }) {
    // Log received memberID
    console.log("Member ID:", memberID);

    // Filter membership records for that memberID
    let memberships = MembershipData.filter(membership => membership.memberID == memberID);

    // Log the filtered memberships
    console.log(memberships);

    return (
        <div className='membershipRecordContainer'>
            <div className='membershipRecordHeadSection'>
                <h1>Membership Record</h1>
                <div className='buttonsContainer'>
                    <button>Add</button>
                    <span className='xMark'><FontAwesomeIcon icon={faXmark} /></span>
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
                                    <td><button>View</button></td>
                                    <td><button>Edit</button></td>
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
    );
}
