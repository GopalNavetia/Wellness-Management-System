import './MemberTable.css'
import MembersData from '../../mocks/MembersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function MemberTable() {

    // Stored Data For Validation
    let storedMembers = MembersData;
    // Pagination state
    let [pageNo, setPageNo] = useState(1);
    let membersPerPage = 10;

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

    function generateMembersData() {
        return membersDataPrint.map(member => (
            <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.type}</td>
                <td>{member.start_date}</td>
                <td>{member.end_date}</td>
                <td>{member.assigned_trainer}</td>
                <td>{member.payment_status}</td>
                <td><button>View</button></td>
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
                    <button>Add</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Trainer</th>
                        <th>Payment</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {generateMembersData()}
                </tbody>
            </table>

            <div className="pagination">
                <p><span className='leftIcon' onClick={handleLeftButton}><FontAwesomeIcon icon={faAngleLeft} /></span> Showing Page {pageNo} out of {totalPages} <span className='rightIcon' onClick={handleRightButton}><FontAwesomeIcon icon={faAngleRight} /></span></p>
            </div>
        </div>
    );
}