import './MemberProfile.css'
import MembersData from '../../mocks/MembersData'
import MemberActionContainer from './MemberActionContainer'
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
                    <p><b>Gender:</b> {member.gender}</p>
                    <p><b>Date of Birth:</b> {member.dob}</p>
                    <p><b>Phone No:</b> {member.phone}</p>
                    <p><b>Address:</b> {member.address}</p>
                    <div className="buttons">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>

                <div className="imgSection">
                </div>
            </div>

            <MemberActionContainer />
        </div>
    );
}