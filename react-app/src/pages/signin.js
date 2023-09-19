import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure the useNavigate hook is imported
import SigninForm from '../components/SignInForm/SigninForm.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function Signin() {
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();  // Use the hook to get the navigate function

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || "[]");
        setUsers(storedUsers);
    }, []);

    function handleSignin(formData) {
        const matchingUser = users.find(user => user.email === formData.email && user.password === formData.password);

        if (!matchingUser) {
            alert("Invalid email or password!");
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(matchingUser));
        setIsLoggedIn(true);

        navigate('/');
    }



    return (
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>
            <div class='row shadow border rounder-5 p-3 bg-white'>
                <SigninForm onSignin={handleSignin}/>  
                {isLoggedIn && <div className="success-message">Login Successful!</div>}
            </div>
                
        </div>
    );
}

export default Signin;
