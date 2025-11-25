import './MemberActionContainer.css'
import MembershipRecord from './Action Components/Membership/MembershipRecord'
import WorkoutRecord from './Action Components/Workout Plan/WorkoutRecord'
import HealthRecord from './Action Components/Health/HealthRecord'
import ProgressRecord from './Action Components/Progress/ProgressRecord'
import { useNavigate, useRoutes } from 'react-router-dom';


export default function MemberActionContainer({ memberID }) {
    // Navigation
    const navigate = useNavigate();

    let handleMembershipButton = () => navigate('/gymdashboard/memberprofile/membershiprecord')
    let handleHealthRecordButton = () => navigate('/gymdashboard/memberprofile/healthrecord')
    let handleWorkoutButton = () => navigate('/gymdashboard/memberprofile/workoutplan')
    let handleProgressButton = () => navigate('/gymdashboard/memberprofile/progress')

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
            { path: 'membershiprecord/*', element: <>{renderPageContent()} < MembershipRecord memberID={memberID} /></> },
            { path: 'workoutplan/*', element: <>{renderPageContent()} <WorkoutRecord memberID={memberID} /></> },
            { path: 'healthrecord/*', element: <>{renderPageContent()} <HealthRecord memberID={memberID} /></> },
            { path: 'progress/*', element: <>{renderPageContent()} <ProgressRecord memberID={memberID} /></> }
        ]);
    }

    return <MemberActionRoutes />;
}