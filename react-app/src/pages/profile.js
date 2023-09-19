import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../components/Profile/ProfileStyles.css';
import profilePicture from '../components/Profile/profilePicture.jpg';
function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setUser(currentUser);
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedName(user.name);
        setEditedEmail(user.email);
        setEditedPassword(user.password);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSave = () => {
        if (!validatePassword(editedPassword)) {
            alert("Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        const updatedUser = {
            ...user,
            name: editedName,
            email: editedEmail,
            password: editedPassword
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const allUsers = JSON.parse(localStorage.getItem('users') || "[]");
        const otherUsers = allUsers.filter(u => u.email !== user.email);
        localStorage.setItem('users', JSON.stringify([...otherUsers, updatedUser]));

        setUser(updatedUser);
        setIsEditing(false);

        alert("Profile edited successfully!");  // Visual cue
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm("Confirm to delete your account");
        
        if (isConfirmed) {
            localStorage.removeItem('currentUser');

            const allUsers = JSON.parse(localStorage.getItem('users') || "[]");
            const updatedUsers = allUsers.filter(u => u.email !== user.email);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            navigate('/');

            alert("Profile deleted successfully!");  // Visual cue
        }
    };

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                {user ? (
                    <>
                        <h2>Your Profile</h2>
                        <img src={profilePicture} alt="User Profile" className="profile-image"/>
                        {isEditing ? (
                            <div className="edit-form">
                                <input
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    placeholder="Name"
                                />
                                <input
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input
                                    type="password"
                                    value={editedPassword}
                                    onChange={(e) => setEditedPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button onClick={handleSave}>Save</button>
                            </div>
                        ) : (
                            <div className="profile-details">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Date of Joining:</strong> {user.dateOfJoining}</p>
                                <div>
                                    <button onClick={handleEdit}>Edit Profile</button>
                                    <button onClick={handleDelete}>Delete Profile</button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
