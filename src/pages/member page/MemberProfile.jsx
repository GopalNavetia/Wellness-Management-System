import './MemberProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MemberProfile() {
    return (
        <div className='memberProfileContainer'>
            <div className="memberProfileHeadSection">
                <h1>Member Profile</h1>
                <span className='xMark' onClick={''/*handleClose*/}><FontAwesomeIcon icon={faXmark} /></span>
            </div>

            <div class="profile">
                <div class="data">
                    <h2>Rohit Sharma</h2>
                    <p><b>Membership:</b> General</p>
                    <p><b>Duration:</b> 1 Jul - 30 Sep</p>
                    <p><b>Trainer:</b> Amit Kumar</p>
                    <p><b>Payment Status:</b> Paid</p>
                    <div class="buttons">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>

                <div class="imgSection">
                </div>
            </div>

            <div class="memberNavigationButtons">
                <button>Membership</button>
                <button>Health Record</button>
                <button>Workout Plan</button>
                <button>Progress</button>
            </div>
        </div>
    );
}