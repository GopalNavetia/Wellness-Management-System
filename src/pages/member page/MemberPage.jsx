import './MemberPage.css'
import Card from './Card';
import MemberTable from './MemberTable'
import AddMember from '../member page/AddMember'
import MemberProfile from './MemberProfile'
import { useRoutes } from 'react-router-dom';
import { useState } from 'react';

export default function MemberPage() {

    const MemberPageRoutes = () => {
        return useRoutes([
            {
                path: '/',
                element: <>
                    <div className="infoCardContainer">
                        <Card title='Total Members' data='80' />
                        <Card title='Active Members' data='64' />
                        <Card title='Expired Members' data='16' />
                    </div>
                    <MemberTable onViewMember={setSelectedMemberId} />
                </>
            },
            {
                path: '/addmember', element: <AddMember />
            },
            {
                path: '/memberprofile/*', element: <MemberProfile memberID={selectedMemberId} />,
            },
        ]);
    };

    // Get ID of Selected Member
    let [selectedMemberId, setSelectedMemberId] = useState(null);

    return (
        <div className="memberPageContainer">
            <MemberPageRoutes />
        </div>
    );
}