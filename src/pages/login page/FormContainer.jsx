import './FormContainer.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackendURL from '../../utils/BackendURL'
import axios from 'axios'


export default function FormContainer({ storeLoginPerson }) {
    const navigate = useNavigate();

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

    // With API
    let handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default submit action

        try {
            const response = await axios.post(
                `${BackendURL}/MyProject/LoginPageAPI`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );

            if (response.status === 200 && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('username', formData.username);
                storeLoginPerson(formData.username);
                setFormData({ username: "", password: "" });
                navigate("/dashboard", { replace: true });
            } else {
                console.log("[DEBUG] Response status:", response.status);
                console.log("[DEBUG] Response data:", response.data);
            }
        }
        catch (error) {
            console.log(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Login failed. Please check your username and password.");
            }
        }
    };

    let handleForgotButton = () => {
        alert("Coming Soon...")
    }

    // let handleForgotButton = async () => {
    //     try {
    //         const response = await axios.post(
    //             `${BackendURL}/MyProject/LoginPasswordAPI`,
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'ngrok-skip-browser-warning': 'true',
    //                 },
    //             }
    //         );

    //         if (response.status === 200) {
    //             setFormData({ username: "", password: "" });
    //         } else {
    //             alert(response.data.message);
    //         }
    //     }
    //     catch (error) {
    //         console.log(error.response);
    //         if (error.response && error.response.data && error.response.data.message) {
    //             alert(error.response.data.message);
    //         } else {
    //             alert("Failed to send password on mail.");
    //         }
    //     }
    // }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input type="text" id="username" name='username' value={formData.username} placeholder="USERNAME" autoComplete="off" onChange={handleInputChange} />
            <input type="password" id="pass" name='password' value={formData.password} placeholder="PASSWORD" autoComplete="off" onChange={handleInputChange} />
            <p onClick={handleForgotButton}>Forgot Password?</p>
            <button className='loginButton'>Login</button>
        </form>
    );
}