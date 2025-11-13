import './WorkoutRecord.css'

export default function WorkoutPlan() {
    return (
        <div className="workoutPlanRecord">
            <div className="workoutPlanRecordHeadSection">
                <h1>Workout Plan</h1>
                <button>Add</button>
            </div>

            <div className="historySection">
                <div className="historyItem">
                    <div className="title">
                        <div className="weekDate">
                            <p><b>From:</b> 01 Aug 2025 <b>To:</b> 30 Sep 2025</p>
                            <button>View</button>
                        </div>
                    </div>
                    <div className="title">
                        <div className="weekDate">
                            <p><b>From:</b> 01 Aug 2025<b>To:</b> 30 Sep 2025</p>
                            <button>View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}