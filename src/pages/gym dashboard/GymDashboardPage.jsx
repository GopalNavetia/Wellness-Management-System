import './GymDashboardPage.css'
import NavbarContainer from './NavbarContainer';
import MenubarContainer from './MenubarContainer';
import PageContainer from './PageContainer';

export default function GymDashboardPage() {
    return (
        <div className='gymDashboard'>
            <NavbarContainer />
            <div className="MainContainer">
                <MenubarContainer />
                <PageContainer />
            </div>
        </div>
    );
}