import './FormContainer.css'
import UserData from '../../mocks/UsersData'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function FormContainer() {
    const navigate = useNavigate();
    // Stored Data For Validation
    const storedUser = UserData;

    // Initialize Common State for Form
    let [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    // Create Common Handler
    let handleInputChange = (e) => {
        let fieldname = e.target.name; // target is used to get the element
        let newValue = e.target.value;

        setFormData((currData) => {
            return {
                ...currData,
                [fieldname]: newValue // [] is used to access the key of objects.
            };
        });
    };

    let handleSubmit = (e) => {
        e.preventDefault(); // use to remove default behavior of submit button

        // Find matching user from UsersData
        const matchedUser = storedUser.find(
            (user) =>
                user.username === formData.username && user.password === formData.password && user.role === 'Admin'
        );

        if (matchedUser) {
            console.log("Login successful!");
            navigate("/dashboard", { replace: true });
        } else {
            alert("Wrong Details");
        }

        // Set Form Data Back to Empty
        setFormData({
            username: "",
            password: ""
        });

    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" id="username" name='username' value={formData.username} placeholder="USERNAME" autoComplete="off" onChange={handleInputChange} /><br />
            <input type="password" id="pass" name='password' value={formData.password} placeholder="PASSWORD" autoComplete="off" onChange={handleInputChange} /> <br />
            <button className='loginButton'>Login</button>
        </form>
    );
}