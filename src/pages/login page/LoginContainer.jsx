import './LoginContainer.css';
import LoginHeadSection from './LoginHeadSection';
import LoginWelcomeContainer from './LoginWelcomeContainer';
import FormContainer from './FormContainer';

export default function LoginContainer({ storeLoginPerson }) {
    return (
        <div className='loginContainer'>
            <LoginHeadSection />
            <LoginWelcomeContainer />
            <FormContainer storeLoginPerson={storeLoginPerson} />
        </div>
    );
}