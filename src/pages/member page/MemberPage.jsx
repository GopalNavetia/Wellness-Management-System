import './MemberPage.css'
import Card from './Card';
import MemberTable from './MemberTable'
import MemberProfile from './MemberProfile'

export default function MemberPage() {
    return (
        <div className="memberPageContainer">
            <div className="infoCardContainer">
                <Card title='Total Members' data='80' />
                <Card title='Active Members' data='64' />
                <Card title='Expired Members' data='16' />
            </div>

            <MemberTable />
            <MemberProfile />
        </div>
    );
}