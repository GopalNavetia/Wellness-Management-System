import './GymDashboardPage.css'
import gymLogo from '../../assets/images/gymLogo.jpeg'
import NavbarContainer from '../../components/NavbarContainer';
import MenubarContainer from './MenubarContainer';
import PageContainer from './PageContainer';

export default function GymDashboardPage({ loginPerson }) {
    return (
        <div className='gymDashboard'>
            <NavbarContainer loginPerson={loginPerson} title='Gym Dashboard' logo={gymLogo} />
            <div className="MainContainer">
                <MenubarContainer />
                <PageContainer />
            </div>
        </div>
    );
}