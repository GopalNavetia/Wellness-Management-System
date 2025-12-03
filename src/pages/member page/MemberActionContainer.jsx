import './MemberActionContainer.css'
import MembershipRecord from './Action Components/Membership/MembershipRecord'
import WorkoutRecord from './Action Components/Workout Plan/WorkoutRecord'
import HealthRecord from './Action Components/Health/HealthRecord'
import ProgressRecord from './Action Components/Progress/ProgressRecord'
import { useNavigate, useRoutes, useParams } from 'react-router-dom';


export default function MemberActionContainer() {
    // Navigation
    const { memberID } = useParams();
    const navigate = useNavigate();

    let handleMembershipButton = () => navigate(`/gymdashboard/memberprofile/${memberID}/membershiprecord/${memberID}`)
    let handleHealthRecordButton = () => navigate(`/gymdashboard/memberprofile/${memberID}/healthrecord/${memberID}`)
    let handleWorkoutButton = () => navigate(`/gymdashboard/memberprofile/${memberID}/workoutplan/${memberID}`)
    let handleProgressButton = () => navigate(`/gymdashboard/memberprofile/${memberID}/progress/${memberID}`)

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
            { path: '/*', element: renderPageContent() },
            { path: 'membershiprecord/*', element: <>{renderPageContent()} < MembershipRecord /></> },
            { path: 'workoutplan/*', element: <>{renderPageContent()} <WorkoutRecord /></> },
            { path: 'healthrecord/*', element: <>{renderPageContent()} <HealthRecord /></> },
            { path: 'progress/*', element: <>{renderPageContent()} <ProgressRecord /></> }
        ]);
    }

    return <MemberActionRoutes />;
}