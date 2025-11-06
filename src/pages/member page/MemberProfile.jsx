import './MemberProfile.css';
import MembersData from '../../mocks/MembersData';
import EditMember from './EditMember';
import MemberActionContainer from './MemberActionContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useRoutes } from 'react-router-dom';

export default function MemberProfile({ memberID }) {
    const navigate = useNavigate();
    const member = MembersData.find(obj => obj.id === memberID);

    if (!member) return null;

    const handleClose = () => navigate(-1);
    const handleEditButton = () => navigate('/gymdashboard/memberprofile/editmember');

    // Member Profile Content
    const renderProfileContent = () => (
        <div className="memberProfileContainer">
            <div className="memberProfileHeadSection">
                <h1>Member Profile</h1>
                <span className="xMark" onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>

            <div className="profile">
                <div className="data">
                    <h2>{member.name}</h2>
                    <p><b>Gender:</b> {member.gender}</p>
                    <p><b>Date of Birth:</b> {member.dob}</p>
                    <p><b>Phone No:</b> {member.phone}</p>
                    <p><b>Address:</b> {member.address}</p>
                    <div className="buttons">
                        <button onClick={handleEditButton}>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className="imgSection"></div>
            </div>

            <MemberActionContainer memberID={memberID} />
        </div>
    );

    const MemberProfileRoutes = () =>
        useRoutes([
            { path: '/', element: renderProfileContent() },
            {
                path: '/editmember',
                element: (
                    <>
                        <EditMember />
                        {renderProfileContent()}
                    </>
                ),
            },
        ]);

    return <MemberProfileRoutes />;
}
