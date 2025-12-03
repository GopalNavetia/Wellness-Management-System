import './MemberProfile.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useRoutes, useParams } from 'react-router-dom';
import EditMember from './EditMember';
import MemberActionContainer from './MemberActionContainer';
import axiosInstance from '../../utils/AxiosInstance.jsx'

export default function MemberProfile() {
    const navigate = useNavigate();
    const { memberID } = useParams();

    // API base URL
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend
    useEffect(() => {
        async function fetchMemberData() {
            try {
                const response = await axiosInstance.get(`/MyProject/MemberDetail?id=${memberID}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                console.log(response.data)
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

    const handleClose = () => navigate('/gymdashboard');
    const handleEditButton = () => navigate(`/gymdashboard/memberprofile/${memberID}/editmember/${memberID}`);
    let handleDeleteButton = async (memberID, name) => {
        // Ask for confirmation
        const ok = window.confirm(`Are you sure you want to delete member: "${name}"?`);

        // If user clicks Cancel, just return
        if (!ok) return;

        try {
            const response = await axiosInstance.delete(`/MyProject/DeleteMemberAPI?id=${memberID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (response.data.success) {
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                        <button onClick={() => handleDeleteButton(memberID, fetchData.name)}>Delete</button>
                    </div>
                </div>
                <div className="imgSection"><img src={fetchData.photo} alt={fetchData.name} /></div>

            </div>

            <MemberActionContainer />
        </div>
    );

    const MemberProfileRoutes = () =>
        useRoutes([
            { path: '/*', element: renderProfileContent() },
            {
                path: '/editmember/:memberID',
                element: (
                    <>
                        <EditMember />
                    </>
                ),
            },
        ]);

    return <MemberProfileRoutes />;
}
