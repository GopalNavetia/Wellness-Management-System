import './LoginHeadSection.css'
import logo from '../../assets/images/logo.png'

export default function LoginHeadSection() {
    return (
        <div className="loginHeadSection">
            <img src={logo} alt="logo" />
        </div>
    );
}