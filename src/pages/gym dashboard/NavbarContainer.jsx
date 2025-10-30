import './NavbarContainer.css'
import gymLogo from '../../assets/images/gymLogo.jpeg'
import { useNavigate } from 'react-router-dom';

export default function NavbarContainer() {

    const navigate = useNavigate();
    let handleLogoutButton = () => {
        navigate('/', { replace: true });
    }

    return (
        <nav className="gymDashboardNavContainer">
            <div>
                <img src={gymLogo} alt="gymLogo" />
                <h1>Gym Dashboard</h1>
            </div>
            <button onClick={handleLogoutButton}>Logout</button>
        </nav>
    );
}