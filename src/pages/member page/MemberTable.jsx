import './MemberTable.css'
import MembersData from '../../mocks/MembersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendURL from '../../utils/BackendURL'

export default function MemberTable({ onViewMember }) {
    // Members Table Data Fetch
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMemberTableData() {
            try {
                const result = await axios.get(`${BackendURL}/MyProject/MemberDashboard`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                setFetchData(result.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMemberTableData();
    }, []);

    // Stored Data For Validation
    // let storedMembers = MembersData;
    let storedMembers = fetchData || [];

    // Pagination state
    let [pageNo, setPageNo] = useState(1);
    let membersPerPage = 8;

    // Search form state
    let [formData, setFormData] = useState({ membername: "", phone: "" });

    // Common Input Change
    let handleInputChange = (e) => {
        let fieldName = e.target.name;
        let newValue = e.target.value;

        setFormData((currData) => {
            return {
                ...currData,
                [fieldName]: newValue
            }
        });
        setPageNo(1); // Reset on every search
    };

    // Filter members based on search inputs
    let filteredMembers = storedMembers.filter(member => {
        const nameMatch = formData.membername.trim() === '' || member.name.toLowerCase().includes(formData.membername.toLowerCase());
        const phoneMatch = formData.phone.trim() === '' || member.phone.toLowerCase().includes(formData.phone.toLowerCase());
        return nameMatch && phoneMatch;
    });

    // Pagination Calculation
    let totalPages = Math.ceil(filteredMembers.length / membersPerPage);
    let startIdx = (pageNo - 1) * membersPerPage;
    let endIdx = startIdx + membersPerPage;
    let membersDataPrint = filteredMembers.slice(startIdx, endIdx);

    // Handle Right Angle Button
    let handleRightButton = () => {
        if (pageNo < totalPages) {
            setPageNo(pageNo + 1);
        }
    }

    // Handle Left Angle Button
    let handleLeftButton = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);
        }
    }

    const navigate = useNavigate();
    // Add Member Button
    function handelAddMemberButton() {
        navigate('/gymdashboard/addmember');
    }

    // View Button
    function handleViewButton() {
        navigate('/gymdashboard/memberprofile');
    }

    function generateMembersData() {
        return membersDataPrint.map(member => (
            <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.type}</td>
                <td>{member.payment_status}</td>
                <td>
                    {member.end_date === ''
                        ? '-'
                        : new Date(member.end_date) >= new Date()
                            ? 'Active'
                            : 'Expired'}
                </td>
                <td>{member.phone}</td>
                <td><button onClick={() => { onViewMember(member.id); handleViewButton() }}>View</button></td>
            </tr>
        ));
    }

    return (
        <div className='tableContainer'>
            <div className="headContainer">
                <h1>Member List</h1>
                {/*  Search Container  */}
                <div className="searchContainer">
                    <input type="text" name="membername" value={formData.name} id="name" placeholder="Search by Name" onChange={handleInputChange} />
                    <input type="text" name="phone" value={formData.phone} id="phone" placeholder="Search by Phone " onChange={handleInputChange} />
                    <button onClick={handelAddMemberButton}>Add</button>
                </div>
            </div>

            {loading ? (
                <div>Loading users...</div> // Loading indicator/message
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Payment</th>
                            <th>Membership</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {generateMembersData()}
                    </tbody>
                </table>
            )}

            <div className="pagination">
                <p><span className='leftIcon' onClick={handleLeftButton}><FontAwesomeIcon icon={faAngleLeft} /></span> Showing Page {pageNo} out of {totalPages} <span className='rightIcon' onClick={handleRightButton}><FontAwesomeIcon icon={faAngleRight} /></span></p>
            </div>
        </div>
    );
}