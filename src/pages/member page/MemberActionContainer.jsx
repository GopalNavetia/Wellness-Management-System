import './MemberActionContainer.css'
import MembershipRecord from './Action Components/Membership/MembershipRecord'
import AddMembership from './Action Components/Membership/AddMembership'
import { useNavigate, useRoutes } from 'react-router-dom';


export default function MemberActionContainer({ memberID }) {
    // Navigation
    const navigate = useNavigate();

    let handleMembershipButton = () => navigate('membershiprecord')
    let handleHealthRecordButton = () => navigate('healthrecord')
    let handleWorkoutButton = () => navigate('workoutplan')
    let handleProgressButton = () => navigate('progress')

    // Render Page Content
    const renderPageContent = () => (
        <div className="memberNavigationButtons">
            <button onClick={handleMembershipButton}>Membership</button>
            <button onClick={handleHealthRecordButton}>Health Record</button>
            <button onClick={handleWorkoutButton}>Workout Plan</button>
            <button onClick={handleProgressButton}>Progress</button>
        </div>
    )

    // Routes
    const MemberActionRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'membershiprecord', element: <>{renderPageContent()} < MembershipRecord memberID={memberID} /></> }
        ]);
    }

    return <MemberActionRoutes />;
}