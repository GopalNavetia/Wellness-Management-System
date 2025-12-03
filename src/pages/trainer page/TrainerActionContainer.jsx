import './TrainerActionContainer.css'
import ClientRecord from './Action Components/Clients/ClientRecord'
import SlotRecord from './Action Components/Slots/SlotRecord'
import { useNavigate, useRoutes, useParams } from 'react-router-dom';


export default function TrainerActionContainer() {
    // Navigation
    const { trainerID } = useParams();
    const navigate = useNavigate();

    let handleClientsButton = () => navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}/clients/${trainerID}`)
    let handleSlotsButton = () => navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}/slots/${trainerID}`)
    let handleSalaryButton = () => navigate(`/gymdashboard/trainerpage/trainerprofile/${trainerID}/salary/${trainerID}`)

    // Render Page Content
    const renderPageContent = () => (
        <div className="trainerNavigationButtons">
            <button onClick={handleClientsButton}>Clients</button>
            <button onClick={handleSlotsButton}>Slots</button>
            <button onClick={handleSalaryButton}>Salary</button>
        </div>
    )

    // Routes
    const TrainerActionRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'clients/*', element: <>{renderPageContent()} <ClientRecord /></> },
            {
                path: 'slots/*', element: <>{renderPageContent()} <SlotRecord /></>
            },
            { path: 'salary/*', element: <>{renderPageContent()} Salary Page</> }
        ]);
    }

    return <TrainerActionRoutes />;
}