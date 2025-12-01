import './TrainerActionContainer.css'
import { useNavigate, useRoutes } from 'react-router-dom';


export default function TrainerActionContainer() {
    // Navigation
    const navigate = useNavigate();

    let handleMembershipButton = () => navigate('/gymdashboard/memberprofile/membershiprecord')
    let handleHealthRecordButton = () => navigate('/gymdashboard/memberprofile/healthrecord')
    let handleWorkoutButton = () => navigate('/gymdashboard/memberprofile/workoutplan')
    let handleProgressButton = () => navigate('/gymdashboard/memberprofile/progress')

    // Render Page Content
    const renderPageContent = () => (
        <div className="trainerNavigationButtons">
            <button onClick={handleMembershipButton}>Clients</button>
            <button onClick={handleHealthRecordButton}>Slots</button>
            <button onClick={handleWorkoutButton}>Salary</button>
        </div>
    )

    // Routes
    const TrainerActionRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'membershiprecord/*', element: <>{renderPageContent()}</> },
            { path: 'workoutplan/*', element: <>{renderPageContent()}</> },
            { path: 'healthrecord/*', element: <>{renderPageContent()}</> },
            { path: 'progress/*', element: <>{renderPageContent()}</> }
        ]);
    }

    return <TrainerActionRoutes />;
}