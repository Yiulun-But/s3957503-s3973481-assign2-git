import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages';
import Profile from './pages/profile';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

function App() {
return (
	<Router>
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/sign-up" element={<SignUp />} />
		<Route path="/sign-in" element={<SignIn />} />
		<Route path="/profile" element={<Profile />} />
	</Routes>
	</Router>
);
}

export default App;

