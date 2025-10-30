import './CardContainer.css'
import Cards from './Cards';
import Notifications from './Notifications';

export default function Card(props) {
    return (
        <div className='cardContainers'>
            {/* Image + Desc */}
            <Cards logo={props.logo} title={props.title} desc={props.desc} />
            {/* Notification */}
            <Notifications data={props.notificationData} />
        </div>
    );
}