import './HealthRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddHealthRecord from './AddHealthRecord'
import EditHealthRecord from './EditHealthRecord'
import { useNavigate, useRoutes } from 'react-router-dom';

export default function HealthRecord({ memberID }) {

    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(-1);
    const handleAddButton = (memberID) => navigate(`addhealthrecord/${memberID}`);
    const handleEditButton = (memberID) => navigate(`edithealthrecord/${memberID}`);

    // Render Page
    const renderPageContent = () => (
        <div className="healthRecord">
            <div className="healthRecordHeadSection">
                <h1>Health Record</h1>
                <div className='buttonsContainer'>
                    <button onClick={() => handleAddButton(memberID)}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>

            <div className="healthTableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><strong>Medical History</strong></td>
                            <td>Dibeties</td>
                        </tr>
                        <tr>
                            <td><strong>Current Medication</strong></td>
                            <td>Prescribe</td>
                        </tr>
                        <tr>
                            <td><strong>Allergy</strong></td>
                            <td>Peanut</td>
                        </tr>
                        <tr>
                            <td><strong>Surgery</strong></td>
                            <td>Hand</td>
                        </tr>
                        <tr>
                            <td><strong>Injury</strong></td>
                            <td>Wrist</td>
                        </tr>
                        <tr>
                            <td><strong>Supplement</strong></td>
                            <td>Protien</td>
                        </tr>
                        <tr>
                            <td><strong>Diet Preference</strong></td>
                            <td>Veg</td>
                        </tr>
                        <tr>
                            <td><strong>Drink</strong></td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <td><strong>Smoke</strong></td>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>

                <div className="buttonContainer">
                    <button onClick={handleEditButton}>Edit</button>
                    <button>Delete</button>
                </div>

            </div>
        </div>
    );

    // Workout Plan Page Routes
    const HealthRecordRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'addhealthrecord/:memberID', element: <AddHealthRecord /> },
            { path: 'edithealthrecord/:memberID', element: <EditHealthRecord /> },
        ]);
    };

    return <HealthRecordRoutes />
}