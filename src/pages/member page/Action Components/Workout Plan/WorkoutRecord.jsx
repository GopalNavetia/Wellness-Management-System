import './WorkoutRecord.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddWorkoutPlan from './AddWorkoutPlan';
import EditWorkoutPlan from './EditWorkoutPlan';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/AxiosInstance';

export default function WorkoutPlan({ memberID }) {
    // Workout Record Table Data Fetch
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewId, setViewId] = useState(null);

    useEffect(() => {
        async function fetchWorkoutPlanTableData() {
            try {
                const result = await axiosInstance.get(`/MyProject/WorkoutRecordAPI?id=${memberID}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                setFetchData(result.data);
            } catch (error) {
                console.log(error.respose);
            } finally {
                setLoading(false);
            }
        }
        fetchWorkoutPlanTableData();
    }, []);

    // Generate History Items
    const generateItems = () => {
        let storedData = fetchData;
        if (storedData && storedData.length > 0) {
            return storedData.map((workoutPlan) => (
                <div key={workoutPlan.workoutId} className="title">
                    <div className="weekDate">
                        <div className="data">
                            <p>
                                <span><b>From:</b> {workoutPlan.start_date}</span>
                                <span> <b>To:</b> {workoutPlan.end_date}</span>
                            </p>
                        </div>
                        <button onClick={() => setViewId(viewId === workoutPlan.workoutId ? null : workoutPlan.workoutId)}>
                            {viewId === workoutPlan.workoutId ? 'Hide' : 'View'}
                        </button>
                    </div>
                    {viewId === workoutPlan.workoutId && (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Workout</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td><strong>Monday</strong></td><td>{workoutPlan.monday}</td></tr>
                                    <tr><td><strong>Tuesday</strong></td><td>{workoutPlan.tuesday}</td></tr>
                                    <tr><td><strong>Wednesday</strong></td><td>{workoutPlan.wednesday}</td></tr>
                                    <tr><td><strong>Thursday</strong></td><td>{workoutPlan.thursday}</td></tr>
                                    <tr><td><strong>Friday</strong></td><td>{workoutPlan.friday}</td></tr>
                                    <tr><td><strong>Saturday</strong></td><td>{workoutPlan.saturday}</td></tr>
                                    <tr><td><strong>Sunday</strong></td><td>{workoutPlan.sunday}</td></tr>
                                </tbody>
                            </table>
                            <div className="buttonContainer">
                                <button onClick={() => handleEditButton(workoutPlan.workoutId)}>Edit</button>
                                <button onClick={() => handleDeleteButton(workoutPlan.workoutId)}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            ));
        } else {
            return <p className="noData" style={{ textAlign: 'center' }}>No workout plans available.</p>;
        }
    };

    // Render Page Content
    const renderPageContent = () => (
        <div className="workoutPlanRecord">
            <div className="workoutPlanRecordHeadSection">
                <h1>Workout Plan</h1>
                <div className='buttonsContainer'>
                    <button onClick={() => handleAddButton(memberID)}>Add</button>
                    <span className='xMark' onClick={handleCloseButton}><FontAwesomeIcon icon={faXmark} /></span>
                </div>
            </div>
            <div className="historySection">
                <div className="historyItem">
                    {loading
                        ? <p style={{ textAlign: 'center' }}>Loading...</p>
                        : generateItems()}
                </div>
            </div>
        </div>
    );

    const navigate = useNavigate();
    const handleCloseButton = () => navigate(-1);
    const handleAddButton = (memberID) => navigate(`addWorkout/${memberID}`);
    const handleEditButton = (workoutID) => navigate(`editWorkout/${workoutID}`);
    let handleDeleteButton = async (workoutID) => {
        // Ask for confirmation
        const ok = window.confirm("Are you sure you want to delete workout record?");

        // If user clicks Cancel, just return
        if (!ok) return;

        try {
            const response = await axiosInstance.delete(`/MyProject/DeleteWorkoutAPI?id=${workoutID}`, {
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            if (response.data.success) {
                setFetchData(prevData => prevData.filter(workoutPlan => workoutPlan.workoutId !== workoutID));
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Define routes at top-level, call useRoutes directly
    const routes = useRoutes([
        { path: '/', element: renderPageContent() },
        { path: 'addWorkout/:memberID', element: <AddWorkoutPlan /> },
        { path: 'editWorkout/:workoutID', element: <EditWorkoutPlan /> },
    ]);

    return routes;
}
