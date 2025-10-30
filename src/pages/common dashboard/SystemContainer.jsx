import './SystemContainer.css'
import CardContainer from './CardContainer';
import gymLogo from '../../assets/images/gymLogo.jpeg'
import clinicLogo from '../../assets/images/clinicLogo.jpeg'
import GymNotificationData from '../../utils/GymNotificationData'

export default function MainContainer() {

    // Card Data
    let gymDesc = [<li key="1">Member Management</li>, <li key="2">Trainer Management</li>, <li key="3">Finance Report</li>];
    let clinicDesc = [<li key="1">Patient Management</li>, <li key="2">Therapist Management</li>, <li key="3">Report Generate</li>]
    return (
        <div className='SystemMainContainer'>
            {/* for gym */}
            <CardContainer logo={gymLogo} title="Gym Dashboard" desc={gymDesc} notificationData={GymNotificationData()} />

            {/* for Clinic */}
            <CardContainer logo={clinicLogo} title="Clinic Dashboard" desc={clinicDesc} />
        </div>
    );
}