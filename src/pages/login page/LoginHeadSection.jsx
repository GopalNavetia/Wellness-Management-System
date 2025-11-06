import './LoginHeadSection.css'
import logo from '../../assets/images/Favicon.png'

export default function LoginHeadSection() {
    return (
        <div className="loginHeadSection">
            <img src={logo} alt="logo" />
        </div>
    );
}