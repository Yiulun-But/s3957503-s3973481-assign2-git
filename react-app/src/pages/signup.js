import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignUpForm/SignupForm.js';

function Signup() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users from localStorage initially
        const storedUsers = JSON.parse(localStorage.getItem('users') || "[]");
        setUsers(storedUsers);
        
    }, []);

    function handleSignup(formData) {
        // Checking if the user is already registered
        const userExists = users.some(user => user.email === formData.email);

        if (userExists) {
            alert("Email already registered!");
            return;
        }

        const updatedUsers = [...users, formData];

        // Update the state with new user data
        setUsers(updatedUsers);

        // Store updated users list in localStorage for persistence
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(formData));

        setIsRegistered(true);

        // Redirect to the homepage after successful signup
        navigate('/');
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>
            <div class='row w-50 shadow border rounder-5 p-3 bg-white'>
                <SignupForm onSignup={handleSignup}/> 
                {isRegistered && <div className="success-message">Registration Successful!</div>}   
            </div>
                
        </div>
    );
}

export default Signup;
