import './PageContainer.css'
import MemberPage from '../member page/MemberPage';
import { useRoutes } from 'react-router-dom';

const GymDashboardPageRoutes = () => {
    return useRoutes([
        { path: '/', element: <MemberPage /> },
    ]);
};

export default function PageContainer() {
    return (
        <div className='PageContainer'>
            <GymDashboardPageRoutes />
        </div>
    );
}