import './MemberPage.css'
import Card from './Card';
import MemberTable from './MemberTable'
import AddMember from '../member page/AddMember'
import MemberProfile from './MemberProfile'
import { useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance'

export default function MemberPage() {
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMemberId, setSelectedMemberId] = useState(null); // useState, not let

    useEffect(() => {
        async function fetchMemberCardData() {
            try {
                const response = await axiosInstance.get("/MyProject/MemberCardDetail", {
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                setFetchData(response.data);
            } catch (error) {
                console.error('Error fetching member data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchMemberCardData();
    }, []);

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    // --- MOVE THIS TO TOP LEVEL ---
    const routes = useRoutes([
        {
            path: '/',
            element: <>
                <div className="infoCardContainer">
                    <Card title='Total Members' data={fetchData.total_members} />
                    <Card title='Active Members' data={fetchData.active_members} />
                    <Card title='Expired Members' data={fetchData.expired_members} />
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

    return (
        <div className="memberPageContainer">
            {routes}
        </div>
    );
}
