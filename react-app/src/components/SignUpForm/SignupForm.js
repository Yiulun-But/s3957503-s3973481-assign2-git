import React, { useState } from 'react';

function SignupForm({ onSignup }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfJoining: '' 
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

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    function getFormattedDate() {
        const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();
        return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("All fields are necessary.");
            return;
        }

        if(!validateEmail(formData.email)) {
            alert("Email is not in proper format.");
            return;
        }

        if(!validatePassword(formData.password)) {
            alert("Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        if(formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Set the current date to dateOfJoining in the desired format
        formData.dateOfJoining = getFormattedDate();

        onSignup(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 >Sign Up</h3>
            <hr/>
            <div className='mb-2'>
                <label htmlFor='name'>Name</label>
                <input type='text' placeholder='Name' className='form-control' name="name" value={formData.name} onChange={handleChange} required/>
            </div>
            <div className='mb-2'>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='Enter Email' className='form-control' name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className='mb-2'>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password' className='form-control' name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div className='mb-5'>
                <label htmlFor='password'>Confirm Password</label>
                <input type='password' placeholder='Confirm Password' className='form-control' name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
            </div>
            <div className='d-grid'>
                <button className='btn btn-dark rounded-0'>Sign up</button>
            </div>
        </form>
    );
}

export default SignupForm;
