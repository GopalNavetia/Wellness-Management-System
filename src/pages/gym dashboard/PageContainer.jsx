import './PageContainer.css'
import MemberPage from '../member page/MemberPage';
import AddMember from '../member page/AddMember'
import FinancePage from '../finance page/FinancePage';
import { useRoutes } from 'react-router-dom';

const GymDashboardPageRoutes = () => {
    return useRoutes([
        { path: '/', element: <MemberPage /> },
        { path: '/addmember', element: <AddMember /> },
        { path: '/financepage', element: <FinancePage /> },
    ]);
};

export default function PageContainer() {
    return (
        <div className='PageContainer'>
            <GymDashboardPageRoutes />
        </div>
    );
}