import './MemberTable.css'
import MembersData from '../../mocks/MembersData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function MemberTable() {

    function generateMembersData() {
        // Stored Data For Validation
        let storedUser = MembersData;

        return storedUser.map(member => (
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
                <p><span className='leftIcon'><FontAwesomeIcon icon={faAngleLeft} /></span> Showing 1-10 of 100 Members<span className='rightIcon'><FontAwesomeIcon icon={faAngleRight} /></span></p>
            </div>
        </div>
    );
}