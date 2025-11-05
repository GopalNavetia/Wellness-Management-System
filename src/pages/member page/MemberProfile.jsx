import './MemberProfile.css'
import MembersData from '../../mocks/MembersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function MemberProfile({ memberID }) {

    // Handle Close
    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    let member = MembersData.find(obj => obj.id === memberID)

    if (!member) {
        return null;
    }


    return (
        <div className='memberProfileContainer'>
            <div className="memberProfileHeadSection">
                <h1>Member Profile</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div className="profile">
                <div className="data">
                    <h2>{member.name}</h2>
                    <p><b>Membership:</b> {member.type}</p>
                    <p><b>Duration:</b> {member.start_date} - {member.end_date}</p>
                    <p><b>Trainer:</b> {member.assigned_trainer}</p>
                    <p><b>Payment Status:</b> {member.payment_status}</p>
                    <div className="buttons">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>

                <div className="imgSection">
                </div>
            </div>

            <div className="memberNavigationButtons">
                <button>Membership</button>
                <button>Health Record</button>
                <button>Workout Plan</button>
                <button>Progress</button>
            </div>
        </div>
    );
}