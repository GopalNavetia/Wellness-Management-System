import './WorkoutRecord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import WorkoutPlanMockData from '../../../../mocks/WorkoutPlanMockData'
import WorkoutTableData from '../../../../mocks/WorkoutTableData'
import AddWorkoutPlan from './AddWorkoutPlan'
import EditWorkoutPlan from './EditWorkoutPlan'
import { useNavigate, useRoutes } from 'react-router-dom';
import { useState } from 'react'

export default function WorkoutPlan() {

    // Navigation helpers
    const navigate = useNavigate();
    const handleCloseButton = () => navigate(-1);
    const handleAddButton = () => navigate('addworkout');
    const handleEditButton = () => navigate('editworkout');


    const [viewId, setViewId] = useState(null);

    // Generate History Items
    let generateItems = () => {
        let storedData = WorkoutPlanMockData;
        if (storedData.length > 0) {
            return storedData.map((workoutPlan) => (
                <div key={workoutPlan.id} className="title">
                    <div className="weekDate">
                        <div className="data">
                            <p>
                                <span><b>From:</b> {workoutPlan.start_date}</span>
                                <span> <b>To:</b> {workoutPlan.end_date}</span>
                            </p>
                        </div>
                        <button onClick={() => setViewId(viewId === workoutPlan.id ? null : workoutPlan.id)}>
                            {viewId === workoutPlan.id ? 'Hide' : 'View'}
                        </button>
                    </div>

                    {/* Render Table: Data will come from WorkoutTableData */}
                    {viewId === workoutPlan.id && (
                        <><table>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Workout</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><strong>Monday</strong></td><td>{WorkoutTableData.monday}</td></tr>
                                <tr><td><strong>Tuesday</strong></td><td>{WorkoutTableData.tuesday}</td></tr>
                                <tr><td><strong>Wednesday</strong></td><td>{WorkoutTableData.wednesday}</td></tr>
                                <tr><td><strong>Thursday</strong></td><td>{WorkoutTableData.thursday}</td></tr>
                                <tr><td><strong>Friday</strong></td><td>{WorkoutTableData.friday}</td></tr>
                                <tr><td><strong>Saturday</strong></td><td>{WorkoutTableData.saturday}</td></tr>
                                <tr><td><strong>Sunday</strong></td><td>{WorkoutTableData.sunday}</td></tr>
                            </tbody>
                        </table>
                            <div className="buttonContainer">
                                <button onClick={handleEditButton}>Edit</button>
                                <button>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            ));
        } else {
            return <p className="noData" style={{ textAlign: 'center' }}>No workout plans available.</p>;
        }
    }

    // Render Page Content
    const renderPageContent = () => (
        <div className="workoutPlanRecord">
            <div className="workoutPlanRecordHeadSection">
                <h1>Workout Plan</h1>
                <div className='buttonsContainer'>
                    <button onClick={handleAddButton}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>
            <div className="historySection">
                <div className="historyItem">
                    {generateItems()}
                </div>
            </div>
        </div>
    );


    // Workout Plan Page Routes
    const WorkoutPlanRoutes = () => {
        return useRoutes([
            { path: '/', element: renderPageContent() },
            { path: 'addWorkout', element: <AddWorkoutPlan /> },
            { path: 'editWorkout', element: <EditWorkoutPlan /> },
        ]);
    };

    return <WorkoutPlanRoutes />
}
