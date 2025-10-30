import './MemberPage.css'
import Card from './Card';

export default function MemberPage() {
    return (
        <div className="memberPageContainer">
            <div className="infoCardContainer">
                <Card title='Total Members' data='80' />
                <Card title='Active Members' data='64' />
                <Card title='Expired Members' data='16' />
            </div>
        </div>
    );
}