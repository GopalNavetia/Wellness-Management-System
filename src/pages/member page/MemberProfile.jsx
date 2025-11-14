import './MemberProfile.css';
import MembersData from '../../mocks/MembersData';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useRoutes } from 'react-router-dom';
import axios from 'axios';
import EditMember from './EditMember';
import MemberActionContainer from './MemberActionContainer';

export default function MemberProfile({ memberID }) {
    const navigate = useNavigate();

    // API base URL
    const API_BASE_URL = 'https://admonitorial-cinderella-hungerly.ngrok-free.dev/MyProject/MemberDetail';
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend
    useEffect(() => {
        async function fetchMemberData() {
            try {
                const response = await axios.get(`${API_BASE_URL}/${memberID}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                setFetchData(response.data);
            } catch (error) {
                console.error('Error fetching member data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchMemberData();
    }, [memberID]);

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (!fetchData) {
        return <p>No member data found.</p>;
    }

    const handleClose = () => navigate(-1);
    const handleEditButton = () => navigate('/gymdashboard/memberprofile/editmember');

    // Member Profile Content
    const renderProfileContent = () => (
        <div className="memberProfileContainer">
            <div className="memberProfileHeadSection">
                <h1>Member Profile</h1>
                <span className="xMark" onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>

            <div className="profile">
                <div className="data">
                    <h2>{fetchData.name}</h2>
                    <p><b>Gender:</b> {fetchData.gender}</p>
                    <p><b>Date of Birth:</b> {fetchData.dob}</p>
                    <p><b>Phone No:</b> {fetchData.phone}</p>
                    <p><b>Address:</b> {fetchData.address}</p>
                    <div className="buttons">
                        <button onClick={handleEditButton}>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className="imgSection"></div>
            </div>

            <MemberActionContainer memberID={memberID} />
        </div>
    );

    const MemberProfileRoutes = () =>
        useRoutes([
            { path: '/*', element: renderProfileContent() },
            {
                path: '/editmember',
                element: (
                    <>
                        <EditMember />
                        {renderProfileContent()}
                    </>
                ),
            },
        ]);

    return <MemberProfileRoutes />;
}
