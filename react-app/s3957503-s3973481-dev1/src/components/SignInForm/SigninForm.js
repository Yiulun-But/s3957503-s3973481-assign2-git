import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SigninForm({ onSignin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!formData.email || !formData.password) {
            alert("Both email and password are required.");
            return;
        }

        if(!validateEmail(formData.email)) {
            alert("Email is not in proper format.");
            return;
        }

        onSignin(formData); // pass the data back to the parent component
    }

    const signupStyle = {
        textDecoration: 'underline', 
        cursor: 'pointer',
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 >Sign In</h3>
            <hr/>
            <div className='mb-2'>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='Enter Email' className='form-control' name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password' className='form-control' name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div className="mt-3">
                <small>Haven't registered? </small>
                <small className="text-primary" style={signupStyle} onClick={() => navigate('/sign-up') }>Sign up</small>
            </div>
            <div className='d-grid'>
                <button className='btn btn-dark rounded-0'>Sign in</button>
            </div>
        </form>
    );
}

export default SigninForm;
