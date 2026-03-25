import './Notifications.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faCalendarXmark, faIndianRupeeSign, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Notifications(props) {
    const navigate = useNavigate();
    function viewMemberButton(memberID) {
        navigate(`/gymdashboard/memberprofile/${memberID}`);
    }

    // When you pass props.data explicitly as an argument to a helper function or any nested function, that function receives data directly as its parameter.
    function generateNotification(data) {
        if (!data || data.length === 0) return <li className="noNotification"><p>No Notification!</p></li>;

        return data.map(member => {
            if (member.type == "expired") {
                return <li key={member.id} onClick={() => viewMemberButton(member.id)}> <span><FontAwesomeIcon icon={faCalendarXmark} /></span> {member.name}'s Membership Expired.</li>
            } else if (member.type == "dueDate") {
                return <li key={member.id} onClick={() => viewMemberButton(member.id)}> <span><FontAwesomeIcon icon={faIndianRupeeSign} /></span> {member.name}'s Payment Due.</li>
            }
            else {
                return <li key={member.id} onClick={() => viewMemberButton(member.id)}> <span><FontAwesomeIcon icon={faTriangleExclamation} /></span> {member.name}'s Membership Expired & Payment Due.</li>
            }
        });
    }

    return (
        <div className='notificationContainer'>
            <h3>Notifications</h3>
            <div className="listContainer">
                <ul>
                    {generateNotification(props.data)}
                </ul>
            </div>
        </div>
    );
}
