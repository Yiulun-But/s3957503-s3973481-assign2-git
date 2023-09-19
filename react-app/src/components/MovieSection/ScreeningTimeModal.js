import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import './Modal.css';
import Rating from './Rating';

const ScreeningTimeModal = ({ movie, show, onHide }) => {
  const [rows, setRows] = useState(1)
  const [editing, setEditing] = useState(false)

  const [rating, setRating] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    content: '',
    user: {},
    rating: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setLoggedInUser(user);
    const movieReviews = JSON.parse(localStorage.getItem(`reviews_${movie?.id}`)) || [];
    setReviews(movieReviews);
  }, [movie?.id]);

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };
  
  const validateReview = () => {
    if (!review.content) {
      alert('Review comments may not be empty.');
      return false;
    }
    if (review.content.length > 1000) {
      alert('Review comments length cannot exceed 250 characters.');
      return false;
    }
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5.');
      return false;
    }
    return true;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      alert('Please sign in to write a review.');
      return;
    }

    if (!validateReview()) {
      return;
    }

    const newReview = {
      content: review.content,
      rating: rating,
      user: {
        name: loggedInUser.name,
      },
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${movie?.id}`, JSON.stringify(updatedReviews));

    setReview({
      content: '',
      user: {},
      rating: 0,
    });
  };



  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='fs-2 text-center p-1' closeButton>
        <h2 className='text-center modal-header p-0'>{movie?.title}</h2>
      </Modal.Header>
      <Modal.Body className='py-3'>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <h3>Screen time</h3>
              {movie?.screeningTimes?.map((time, index) => (
                <div key={index}>
                  <div className="my-3 w-100 fs-4">{time}</div>
                </div>
              ))}
            </Col>
            <Col xs={12} md={8} className="scroll" >
              <h4>Synopsis</h4>
              <p>{movie?.synopsis}</p>
              <hr />
              <h4>Reviews</h4>
              {reviews.map((rev, index) => (
                <div key={index}>
                  <strong>{rev.user?.name}: </strong>
                  <span>{rev.content}</span>
                  <Rating className='float-right' rating={rev.rating} OnRating={() => {}}/>
                </div>
              ))}
              {loggedInUser && (
                <div className="write-review opacity-100 bg-white position-sticky" >
                  <Form className="review-input my-0" onSubmit={handleReviewSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control
                        as="textarea"
                        name="content"
                        rows={rows}
                        onChange={handleChange}
                        value={review.content}
                        onFocus={() => {setRows(5)
                                        setEditing(true)}}
                        onBlur={() => {setRows(1)
                                        setEditing(false)}}
                      />
                    </Form.Group>
                    {editing && (
                      <div className='overflow-visible'>
                        <div className='to-the-left'>
                          <Rating rating={rating} OnRating={(rate) => setRating(rate)} />
                        </div>
                        <Button className="to-the-right mt-0 bg-primary" variant="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                    ) }
                    
                  </Form>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ScreeningTimeModal;