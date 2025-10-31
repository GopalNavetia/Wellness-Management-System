import './MemberTable.css'
import MembersData from '../../mocks/MembersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function MemberTable() {

    // Stored Data For Validation
    let storedMembers = MembersData;
    // Index for Member Data
    let [pageNo, setPageNo] = useState(1);
    let membersPerPage = 10;
    let startIdx = (pageNo - 1) * membersPerPage;
    let endIdx = startIdx + membersPerPage;
    let totalPages = Math.ceil(storedMembers.length / membersPerPage);

    let membersDataPrint = storedMembers.slice(startIdx, endIdx);
    console.log(membersDataPrint);

    // Handle Right Angle Button
    let handleRightButton = () => {
        if (pageNo < totalPages) {
            setPageNo(pageNo + 1);
            console.log("Change Page no Right: " + (pageNo + 1));
        }
    }

    // Handle Left Angle Button
    let handleLeftButton = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);
            console.log("Change Page no Left: " + (pageNo - 1));
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
                    <input type="text" name="searchName" id="name" placeholder="Search by Name" />
                    <input type="text" name="searchPhone" id="phone" placeholder="Search by Phone " />
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
                <p><span className='leftIcon' onClick={handleLeftButton}><FontAwesomeIcon icon={faAngleLeft} /></span> Showing 1-10 of 100 Members<span className='rightIcon' onClick={handleRightButton}><FontAwesomeIcon icon={faAngleRight} /></span></p>
            </div>
        </div>
    );
}