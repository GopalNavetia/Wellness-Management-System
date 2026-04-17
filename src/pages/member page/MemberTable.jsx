import './MemberTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MembersData from '../../mocks/MembersData'
import { faAngleLeft, faAngleRight, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance.jsx'

export default function MemberTable() {
    // Members Table Data Fetch
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMemberTableData() {
            try {
                const result = await axiosInstance.get(`/MyProject/MemberDashboard`, {
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
    let [formData, setFormData] = useState({
        membername: "",
        phone: "",
        type: "",
        membership: "",
        payment: ""
    });

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
        const membershipStatus = member.end_date === ''
            ? '-'
            : new Date(member.end_date) >= new Date()
                ? 'Active'
                : 'Expired';

        const nameMatch =
            formData.membername.trim() === '' ||
            (member.name || '').toLowerCase().includes(formData.membername.toLowerCase());

        const phoneMatch =
            formData.phone.trim() === '' ||
            String(member.phone || '').includes(formData.phone);

        const typeMatch =
            formData.type === '' ||
            (member.type || '').toLowerCase() === formData.type.toLowerCase();

        const membershipMatch =
            formData.membership === '' ||
            membershipStatus.toLowerCase() === formData.membership.toLowerCase();

        const paymentMatch =
            formData.payment === '' ||
            (member.payment_status || '').toLowerCase() === formData.payment.toLowerCase();

        return nameMatch && phoneMatch && typeMatch && membershipMatch && paymentMatch;
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
    function handleViewButton(memberID) {
        navigate(`/gymdashboard/memberprofile/${memberID}`);
    }

    function generateMembersData() {
        return membersDataPrint.map(member => {
            // Compute status values with consistent naming
            const membershipStatus = member.end_date === ''
                ? '-'
                : new Date(member.end_date) >= new Date()
                    ? 'Active'
                    : 'Expired';

            const paymentStatusClass = `paymentStatus-${member.payment_status.toLowerCase()}`;
            const membershipStatusClass = `membershipStatus-${membershipStatus.toLowerCase()}`;

            return (
                <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.type}</td>
                    <td className={membershipStatusClass}>
                        {membershipStatus}
                    </td>
                    <td className={paymentStatusClass}>
                        {member.payment_status}
                    </td>
                    <td>{member.phone}</td>
                    <td><button onClick={() => handleViewButton(member.id)}>View</button></td>
                </tr>
            );
        });
    }

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterDropdownRef = useRef(null);

    const toggleFilter = () => setIsFilterOpen((prev) => !prev);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                filterDropdownRef.current &&
                !filterDropdownRef.current.contains(e.target)
            ) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleResetFilters = () => {
        setFormData({
            membername: "",
            phone: "",
            type: "",
            membership: "",
            payment: ""
        });
        setPageNo(1);
    };

    return (
        <div className='memberTableContainer'>
            <div className="headContainer">
                <h1>Member List</h1>
                {/*  Search Container  */}
                <div className="memberFilterContainer">
                    <div className="filterDropdown" ref={filterDropdownRef}>
                        <span
                            className="filterIcon"
                            onClick={toggleFilter}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    toggleFilter();
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faFilter} />
                        </span>

                        <div className={`filterItems ${isFilterOpen ? "open" : ""}`}>
                            <div className="searchRow">
                                <input type="text" name="membername" value={formData.membername} id="name" placeholder="Search by Name" onChange={handleInputChange} />
                                <input type="text" name="phone" value={formData.phone} id="phone" placeholder="Search by Phone" onChange={handleInputChange} />
                            </div>

                            <div className="radioGroup">
                                <span>Type:</span>
                                <label><input type="radio" name="type" value="General" checked={formData.type === 'General'} onChange={handleInputChange} /> General</label>
                                <label><input type="radio" name="type" value="PT" checked={formData.type === 'PT'} onChange={handleInputChange} /> PT</label>
                            </div>

                            <div className="radioGroup">
                                <span>Membership:</span>
                                <label><input type="radio" name="membership" value="Active" checked={formData.membership === 'Active'} onChange={handleInputChange} /> Active</label>
                                <label><input type="radio" name="membership" value="Expired" checked={formData.membership === 'Expired'} onChange={handleInputChange} /> Expired</label>
                            </div>

                            <div className="radioGroup">
                                <span>Payment:</span>
                                <label><input type="radio" name="payment" value="Paid" checked={formData.payment === 'Paid'} onChange={handleInputChange} /> Paid</label>
                                <label><input type="radio" name="payment" value="Pending" checked={formData.payment === 'Pending'} onChange={handleInputChange} /> Pending</label>
                            </div>

                            <button type="button" className="resetFilterBtn" onClick={handleResetFilters}>
                                Reset
                            </button>
                        </div>
                    </div>

                    <button onClick={handelAddMemberButton}>Add</button>
                </div>
            </div>
            <div className='memberListContainer'>

                {loading ? (
                    <div>Loading members...</div> // Loading indicator/message
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Membership</th>
                                <th>Payment</th>
                                <th>Contact</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {generateMembersData()}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="pagination">
                <p><span className='leftIcon' onClick={handleLeftButton}><FontAwesomeIcon icon={faAngleLeft} /></span> Showing Page {pageNo} out of {totalPages} <span className='rightIcon' onClick={handleRightButton}><FontAwesomeIcon icon={faAngleRight} /></span></p>
            </div>
        </div>
    );
}