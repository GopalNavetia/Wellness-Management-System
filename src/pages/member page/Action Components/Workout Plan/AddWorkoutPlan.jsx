import './AddWorkoutPlan.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function AddWorkoutPlan() {

    const navigate = useNavigate();
    let handleClose = () => {
        navigate(-1)
    };

    return (
        <div className="addWorkout">
            <div className="addWorkoutHeadSection">
                <h1>Add Workout Plan</h1>
                <span className='xMark' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div class="formContainer">
                <div class="dateContainer">
                    <label htmlFor="from-date">From: <input type="date" name="fromDate" id="from-date" /></label>
                    <label htmlFor="to-date">To: <input type="date" name="toDate" id="to-date" /></label>
                </div>

                <table>
                    <tr>
                        <th>Day</th>
                        <th>Workout</th>
                    </tr>

                    <tr>
                        <td><label htmlFor="monday">Monday</label></td>
                        <td><input type="text" name="monday" id="monday" /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="tuesday">Tuesday</label></td>
                        <td><input type="text" name="tuesday" id="tuesday" /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="wednesday">Wednesday</label></td>
                        <td><input type="text" name="wednesday" id="wednesday" /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="thursday">Thursday</label></td>
                        <td><input type="text" name="thursday" id="thursday" /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="friday">Friday</label></td>
                        <td><input type="text" name="friday" id="friday" /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="saturday">Saturday</label></td>
                        <td><input type="text" name="saturday" id="saturday" /></td>
                    </tr>

                    <tr>
                        <td><label htmlFor="sunday">Sunday</label></td>
                        <td><input type="text" name="sunday" id="sunday" /></td>
                    </tr>
                </table>

                <button>Save</button>
            </div>
        </div>
    );
}