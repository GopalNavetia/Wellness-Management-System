import './AddHealthRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function AddHealthRecord() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    return (
        <div className="addHealthRecord">
            <div className="addHealthRecordHeadSection">
                <h1>Add Health Record</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div class="formContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td><label htmlFor="medicalHistory">Medical History</label></td>
                            <td><input type="text" name="medicalHistory" id="medicalHistory" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="currentMedication">Current Medication</label></td>
                            <td><input type="text" name="currentMedication" id="currentMedication" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="allergy">Allergy</label></td>
                            <td><input type="text" name="allergy" id="allergy" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="surgery">Surgery</label></td>
                            <td><input type="text" name="surgery" id="surgery" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="injury">Injury</label></td>
                            <td><input type="text" name="injury" id="injury" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="supplement">Supplement</label></td>
                            <td><input type="text" name="supplement" id="supplement" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="dietPreference">Diet Preference</label></td>
                            <td><input type="text" name="dietPreference" id="dietPreference" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="drink">Drink</label></td>
                            <td><input type="text" name="drink" id="drink" /></td>
                        </tr>

                        <tr>
                            <td><label htmlFor="smoke">Smoke</label></td>
                            <td><input type="text" name="smoke" id="smoke" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttonContainer">
                    <button>Save</button>
                    <button>Reset</button>
                </div>
            </div>
        </div >
    );
}