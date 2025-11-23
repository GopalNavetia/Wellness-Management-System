import './LoginPage.css'
import LoginContainer from './LoginContainer'

export default function LoginPage({ storeLoginPerson }) {
    return <div className='window'>
        <LoginContainer storeLoginPerson={storeLoginPerson} />
    </div>
}