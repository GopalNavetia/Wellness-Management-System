import './PageContainer.css'
import MemberPage from '../member page/MemberPage';
import TrainerPage from '../trainer page/TrainerPage';
import FinancePage from '../finance page/FinancePage';
import { useRoutes } from 'react-router-dom';

const GymDashboardPageRoutes = () => {
    return useRoutes([
        { path: '/*', element: <MemberPage /> },
        { path: '/financepage', element: <FinancePage /> },
        { path: '/trainerpage', element: <TrainerPage /> }
    ]);
};

export default function PageContainer() {
    return (
        <div className='PageContainer'>
            <GymDashboardPageRoutes />
        </div>
    );
}