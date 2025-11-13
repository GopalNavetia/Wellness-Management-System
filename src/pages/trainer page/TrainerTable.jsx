import './TrainerTable.css'
import MembersData from '../../mocks/MembersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrainerTable({ onViewMember }) {

    // // Stored Data For Validation
    // let storedMembers = MembersData;
    // // Pagination state
    // let [pageNo, setPageNo] = useState(1);
    // let membersPerPage = 8;

    // // Search form state
    // let [formData, setFormData] = useState({ membername: "", phone: "" });

    // // Common Input Change
    // let handleInputChange = (e) => {
    //     let fieldName = e.target.name;
    //     let newValue = e.target.value;

    //     setFormData((currData) => {
    //         return {
    //             ...currData,
    //             [fieldName]: newValue
    //         }
    //     });
    //     setPageNo(1); // Reset on every search
    // };

    // // Filter members based on search inputs
    // let filteredMembers = storedMembers.filter(member => {
    //     const nameMatch = formData.membername.trim() === '' || member.name.toLowerCase().includes(formData.membername.toLowerCase());
    //     const phoneMatch = formData.phone.trim() === '' || member.phone.toLowerCase().includes(formData.phone.toLowerCase());
    //     return nameMatch && phoneMatch;
    // });

    // // Pagination Calculation
    // let totalPages = Math.ceil(filteredMembers.length / membersPerPage);
    // let startIdx = (pageNo - 1) * membersPerPage;
    // let endIdx = startIdx + membersPerPage;
    // let membersDataPrint = filteredMembers.slice(startIdx, endIdx);

    // // Handle Right Angle Button
    // let handleRightButton = () => {
    //     if (pageNo < totalPages) {
    //         setPageNo(pageNo + 1);
    //     }
    // }

    // // Handle Left Angle Button
    // let handleLeftButton = () => {
    //     if (pageNo > 1) {
    //         setPageNo(pageNo - 1);
    //     }
    // }

    // const navigate = useNavigate();
    // // Add Member Button
    // function handelAddMemberButton() {
    //     navigate('/gymdashboard/addmember');
    // }

    // // View Button
    // function handleViewButton() {
    //     navigate('/gymdashboard/memberprofile');
    // }

    // function generateMembersData() {
    //     return membersDataPrint.map(member => (
    //         <tr key={member.id}>
    //             <td>{member.name}</td>
    //             <td>{member.type}</td>
    //             <td>{member.payment_status}</td>
    //             <td>{new Date(member.end_date) >= new Date() ? 'Active' : 'Expired'}</td>
    //             <td>{member.phone}</td>
    //             <td><button onClick={() => { onViewMember(member.id); handleViewButton() }}>View</button></td>
    //         </tr>
    //     ));
    // }

    return (
        <div className='tableContainer'>
            <div className="headContainer">
                <h1>Trainer List</h1>
                {/*  Search Container  */}
                <div className="searchContainer">
                    <input type="text" name="membername" value={''} id="name" placeholder="Search by Name" onChange={''} />
                    <input type="text" name="phone" value={''} id="phone" placeholder="Search by Phone " onChange={''} />
                    <button onClick={''}>Add</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                         <th>Assigned Client</th>
                         <th>Status</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {/* INPUT TABLE DATA */}
                    <tr>
                    <td>Akash</td>
                    <td>5</td>
                    <td>OnLeave</td>
                    <td>9845642323</td>
                   
                    
                    <td><button>View</button></td>
                    </tr>
                    <tr>
                    <td>Manav</td>
                    <td>5</td>
                    <td>OnLeave</td>
                    <td>9845642323</td>
                   <td><button>View</button></td> 
                 </tr>
 
                </tbody>
            </table>

            <div className="pagination">
                <p><span className='leftIcon' onClick={''}><FontAwesomeIcon icon={faAngleLeft} /></span> Showing Page {} out of {} <span className='rightIcon' onClick={''}><FontAwesomeIcon icon={faAngleRight} /></span></p>
            </div>
        </div>
    );
}