import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import MovieList from '../components/MovieSection/MovieList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer.js';

function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <MovieList />
            <Footer/>
        </>
    );
}
export default Home;
