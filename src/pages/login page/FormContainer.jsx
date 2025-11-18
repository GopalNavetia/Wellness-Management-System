import './FormContainer.css'
import UserData from '../../mocks/UsersData'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackendURL from '../../utils/BackendURL'
import axios from 'axios'


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

            // Debug: log full response for inspection
            // console.log("[DEBUG] Axios response:", response);

            if (response.status === 200 && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                setFormData({ username: "", password: "" });
                navigate("/dashboard", { replace: true });
            } else {
                alert('Login failed: ' + (response.data.message || "No token in response"));
                console.log("[DEBUG] Response status:", response.status);
                console.log("[DEBUG] Response data:", response.data);
            }
        } catch (error) {
            // Debug: log all Axios error details
            if (error.response) {
                // Request made, server responded with error code
                console.error("[DEBUG] Backend responded with error");
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                // Request made, no response received
                console.error("[DEBUG] No response received from server");
                console.error("Request:", error.request);
            } else {
                // Error setting up request
                console.error("[DEBUG] Error setting up Axios request");
                console.error("Message:", error.message);
            }
            // Always log original error config for trace
            console.error("[DEBUG] Error config:", error.config);
        }
    };


    // With MOCK data
    // let handleSubmit = (e) => {
    //     e.preventDefault(); // use to remove default behavior of submit button

    //     // Find matching user from UsersData
    //     const matchedUser = storedUser.find(
    //         (user) =>
    //             user.username === formData.username && user.password === formData.password && user.role === 'Admin'
    //     );

    //     if (matchedUser) {
    //         console.log("Login successful!");
    //         navigate("/dashboard", { replace: true });
    //     } else {
    //         alert("Wrong Details");
    //     }

    //     // Set Form Data Back to Empty
    //     setFormData({
    //         username: "",
    //         password: ""
    //     });

    // };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input type="text" id="username" name='username' value={formData.username} placeholder="USERNAME" autoComplete="off" onChange={handleInputChange} /><br />
            <input type="password" id="pass" name='password' value={formData.password} placeholder="PASSWORD" autoComplete="off" onChange={handleInputChange} /> <br />
            <button className='loginButton'>Login</button>
        </form>
    );
}