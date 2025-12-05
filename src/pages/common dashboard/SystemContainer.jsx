import "./SystemContainer.css";
import CardContainer from "./CardContainer";
import gymLogo from "../../assets/images/gymLogo.jpeg";
import clinicLogo from "../../assets/images/clinicLogo.jpeg";
import useGymNotifications from "../../utils/GymNotificationData";

export default function MainContainer() {
    const gymNotifications = useGymNotifications();   // call the hook here

    const gymDesc = [
        <li key="1">Member Management</li>,
        <li key="2">Trainer Management</li>,
        <li key="3">Finance Report</li>,
    ];

    const clinicDesc = [
        <li key="1">Patient Management</li>,
        <li key="2">Therapist Management</li>,
        <li key="3">Report Generate</li>,
    ];

    return (
        <div className="SystemMainContainer">
            {/* Gym */}
            <CardContainer
                logo={gymLogo}
                title="Gym Dashboard"
                desc={gymDesc}
                notificationData={gymNotifications}
            />

            {/* Clinic */}
            {/* <CardContainer
                logo={clinicLogo}
                title="Clinic Dashboard"
                desc={clinicDesc}
            /> */}
        </div>
    );
}
