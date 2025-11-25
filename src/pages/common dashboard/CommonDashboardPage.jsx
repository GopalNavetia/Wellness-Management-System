import './CommonDashboardPage.css'
import navLogo from '../../assets/images/wellnessLogo.png'
import NavbarContainer from '../../components/NavbarContainer';
import SystemContainer from './SystemContainer';
import MyProfileContainer from './MyProfileContainer';
import ManageUsersContainer from './ManageUsersContainer'
import AddUser from './AddUser'
import EditUser from './EditUser';
import { useRoutes } from 'react-router-dom';
import { useState } from 'react';

export default function CommonDashboardPage({ loginPerson }) {
    const DashboardRoutes = () => {
        return useRoutes([
            { path: '', element: <SystemContainer /> },
            { path: 'myprofile', element: <MyProfileContainer /> },
            { path: 'manageuser', element: <ManageUsersContainer onEditUser={setSelectedUsername} /> },
            { path: 'adduser', element: <AddUser /> },
            { path: 'edituser/:username', element: <EditUser /> }
        ]);
    };

    // Get ID of Selected User
    let [selectedUsername, setSelectedUsername] = useState(null);
    return (
        <div className='CommonDashboard'>
            <NavbarContainer loginPerson={loginPerson} title='Main Dashboard' logo={navLogo} />
            <DashboardRoutes />
        </div>
    );
}
