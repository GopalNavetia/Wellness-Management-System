import './Cards.css'
import { useNavigate } from 'react-router-dom';

export default function Cards(props) {

    const navigate = useNavigate();
    let handleCardClick = () => {
        if (props.title == "Gym Dashboard") {
            navigate('/gymdashboard');
        }
    };

    return (
        <div className='card' onClick={handleCardClick}>
            <img src={props.logo} alt="" />
            <div className="desc">
                <h3>{props.title}</h3>
                <ul>{props.desc}</ul>
            </div>
        </div>
    );
}