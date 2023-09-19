import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiMovie2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './index.css';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setLoggedInUser(null);
    };

    const toggleProfilePopup = () => {
        setShowProfilePopup(prev => !prev);
    };

    const firstName = loggedInUser?.name?.split(' ')[0];

    return (
        <>
            <NavBar bg='dark' variant='dark' sticky='top' className='nav-container'>
            <Container fluid>
                <NavBar.Brand href="/" className='d-flex justify-content-start'>
                <RiMovie2Line className='mb-2 me-2'/>
                Loop Cinemas
                </NavBar.Brand>
                <Nav className="nav-menu justify-content-end ms-auto" activeKey="/home">
                        {!loggedInUser ? (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/sign-in" className="nav-link">Sign In</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/sign-up" className="nav-link">Sign Up</Nav.Link>
                                </Nav.Item>
                            </>
                        ) : (
                            <>
                                <div className="welcome-text m-2" onClick={toggleProfilePopup}>
                                    Welcome, {firstName}
                                    {showProfilePopup && (
                                        <div className="profile-popup">
                                            <p><label>Name: </label>{loggedInUser.name}</p>
                                            <p><label>Email: </label>{loggedInUser.email}</p>
                                            <p><label>Joined: </label>{loggedInUser.dateOfJoining}</p>
                                            <div className = "btn-container">
                                                <button className="small-btn"><Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>View Profile</Link></button>
                                                <button className="small-btn"><Link to='/' onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }}>Sign Out</Link></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <Nav.Item>
                            <Button className='mx-0 my-0' variant="dark" onClick={handleShow}>
                                <AiOutlineMenu className="bars" onClick={handleShow} />
                            </Button>
                            
                            {!loggedInUser ? (
                                <Offcanvas show={show} onHide={handleClose} placement='end' data-bs-theme="dark">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title className='fs-4 mb-3 mt-2'>Guest</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <ListGroup className='mx-2 border-end-0 border-start-0'>
                                            <ListGroup.Item className='p-3 border-end-0 border-start-0 fs-5'><a className='text-decoration-none text-white' href='/sign-in'>Sign In</a></ListGroup.Item>
                                            <ListGroup.Item className='p-3 border-end-0 border-start-0 fs-5'><a className='text-decoration-none text-white' href='/sign-up'>Sign Up</a></ListGroup.Item>
                                        </ListGroup>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            ):(
                                <Offcanvas show={show} onHide={handleClose} placement='end' data-bs-theme="dark">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title className='fs-4 mb-3 mt-2'>{firstName}</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body className='p-0'>
                                        <ListGroup className='mx-2 border-end-0 border-start-0'>
                                            <ListGroup.Item className='p-3 border-end-0 border-start-0 fs-5'><a className='text-decoration-none text-white' href='/profile'>View Profile</a></ListGroup.Item>
                                            <ListGroup.Item className='p-3 border-end-0 border-start-0 fs-5'><a className='text-decoration-none text-white' href='/'>My Reviews</a></ListGroup.Item>
                                            <ListGroup.Item className='p-3 border-end-0 border-start-0 fs-5'><a className='text-decoration-none text-danger' href='/' onClick={handleLogout}>Log Out</a></ListGroup.Item>
                                        </ListGroup>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            )}
                        </Nav.Item>
                    </Nav>
                </Container>
            </NavBar>
        </>
    );
};

export default Navbar;
