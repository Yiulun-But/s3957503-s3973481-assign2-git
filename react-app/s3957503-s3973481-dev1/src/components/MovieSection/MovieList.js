import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import ScreeningTimeModal from './ScreeningTimeModal';
import img1 from './images/image1.jpg';
import img2 from './images/image2.jpg';
import img3 from './images/image3.jpg';
import img4 from './images/image4.jpg';
import img5 from './images/image5.jpg';
import img6 from './images/image6.jpg';
import img7 from './images/image7.jpg';
import img8 from './images/image8.jpg';

const movies = [
  // Add your movie objects here
  // Example:
  { id: 1,
    title: 'Barbie', 
    image: img1, 
    synopsis: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.', 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
  { id: 2,
    title: 'Oppenheimer', 
    image: img2, 
    synopsis: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.", 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
  { id: 3,
    title: 'Wonka', 
    image: img3, 
    synopsis: 'Focusing on a young Willy Wonka and how he came to meet the Oompa-Loompas on one of his earliest adventures.', 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
  { id: 4,
    title: 'Blue Beetle', 
    image: img4, 
    synopsis: "Jaime Reyes suddenly finds himself in possession of an ancient relic of alien biotechnology called the Scarab. When the Scarab chooses Jaime to be its symbiotic host, he's bestowed with an incredible suit of armor that's capable of extraordinary and unpredictable powers, forever changing his destiny as he becomes the superhero Blue Beetle.", 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
  { id: 5,
    title: 'Gran Turismo', 
    image: img5, 
    synopsis: "A player wins a series of Nissan-sponsored video game competitions through his gaming skills and becomes a real-life professional race car driver.", 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
  { id: 6,
    title: 'Transformers: Rise of the Beasts', 
    image: img6, 
    synopsis: 'Set in 1994, the film follows ex-military electronics expert Noah Diaz and artifact researcher Elena Wallace as they help the Autobots and the Maximals protect an artifact known as the Transwarp Key from the villainous Terrorcons who intend to use it to bring their master Unicron to Earth.', 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
  { id: 7,
    title: "Five Nights at Freddy's", 
    image: img7, 
    synopsis: "A troubled security guard begins working at Freddy Fazbear's Pizzeria. While spending his first night on the job, he realizes the late shift at Freddy's won't be so easy to make it through.", 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
  { id: 8,
    title: 'Insidious: The Red Door', 
    image: img8, 
    synopsis: "Josh Lambert heads east to drop his son, Dalton, off at school. However, Dalton's college dream soon becomes a living nightmare when the repressed demons of his past suddenly return to haunt them both.", 
    screeningTimes: ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'] },
];



const MovieList = () => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    // Initialize localStorage for each movie
    movies.forEach((movie) => {
      if (!localStorage.getItem(movie.id)) {
        localStorage.setItem(movie.id, JSON.stringify([]));
      }
    });
  }, []);

  const handleScreeningTime = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <Movie key={index} movie={movie} onShowTime={handleScreeningTime} show={isModalOpen} onHide={() => handleCloseModal()}/>
        ))}
      </div>
        <ScreeningTimeModal movie={selectedMovie} show={isModalOpen}  onHide={() => handleCloseModal()} />
    </div>
  );
};

export default MovieList;
