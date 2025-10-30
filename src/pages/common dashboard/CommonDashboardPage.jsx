import './CommonDashboardPage.css'
import { useRoutes } from 'react-router-dom';
import NavbarContainer from './NavbarContainer';
import SystemContainer from './SystemContainer';
import MyProfileContainer from './MyProfileContainer';
import ManageUsersContainer from './ManageUsersContainer'
import AddUser from './AddUser'
import EditUser from './EditUser';

const DashboardRoutes = () => {
    return useRoutes([
        { path: '', element: <SystemContainer /> },
        { path: 'myprofile', element: <MyProfileContainer /> },
        { path: 'manageuser', element: <ManageUsersContainer /> },
        { path: 'adduser', element: <AddUser /> },
        { path: 'edituser', element: <EditUser /> }
    ]);
};

export default function CommonDashboardPage() {
    return (
        <div className='CommonDashboard'>
            <NavbarContainer />
            <DashboardRoutes />
        </div>
    );
}
