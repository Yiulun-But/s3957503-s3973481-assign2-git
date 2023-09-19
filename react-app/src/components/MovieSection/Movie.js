import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './MovieSection.css';

const Movie = ({ movie, onShowTime, show, onHide }) => {
    const [hovered, setHovered] = useState(false);
    return (
        
            <div
                className="movie"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ width: '23%', padding: '5px' }}
                >
                <img src={movie.image} alt={movie.title} width="100%" />
                {hovered && (
                    <div className="movie-details">
                        <h2>Screening Times</h2>
                            {movie.screeningTimes.map((time, index) => (
                            <div className='' key={index}>
                                <div className='my-2 w-100 fs-5'>{time}</div>
                            </div>
                            ))}
                        <button onClick={() => onShowTime(movie)}>Show Screening Times</button>
                    </div>
                )}
            </div>
            
        
        
    );
};


export default Movie;
