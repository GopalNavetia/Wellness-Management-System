import './MemberActionContainer.css'
import MembershipRecord from './Action Components/Membership/MembershipRecord'

export default function MemberActionContainer({ memberID }) {
    return (
        <>
            <div className="memberNavigationButtons">
                <button>Membership</button>
                <button>Health Record</button>
                <button>Workout Plan</button>
                <button>Progress</button>
            </div>

            <div className="actionContainer">
                <MembershipRecord memberID={memberID} />
            </div>
        </>
    );
}