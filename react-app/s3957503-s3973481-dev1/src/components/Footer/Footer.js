import React from 'react';
import {AiFillInstagram, AiOutlineTwitter, AiFillYoutube, AiFillFacebook} from 'react-icons/ai';
import {FaTiktok} from 'react-icons/fa'

const Footer = () => {
    
    return (
        
            <div className='container-fluid bg-dark p-3 '>
                <div className='row ms-3'>
                    <div className='col-3'>
                        <h2 className='fs-4 text-secondary fw-bold '>follow us</h2>
                        <ul className='list-group list-group-horizontal bg-dark'>
                            <li className="list-group-item bg-dark border-0 pe-2"><AiFillInstagram size={28} color='#ffffff'/></li>
                            <li className="list-group-item bg-dark border-0 pe-2"><FaTiktok size={28} color='#ffffff'/></li>
                            <li className="list-group-item bg-dark border-0 pe-2"><AiOutlineTwitter size={28} color='#ffffff'/></li>
                            <li className="list-group-item bg-dark border-0 pe-2"><AiFillYoutube size={28} color='#ffffff'/></li>
                            <li className="list-group-item bg-dark border-0 pe-2"><AiFillFacebook size={28} color='#ffffff'/></li>
                        </ul>
                    </div>
                    <div className='col-9'>
                        <h2 className='fs-4 text-secondary fw-bold'>about us</h2>
                        <ul className='list-group list-group-horizontal bg-dark'>
                            <li className="list-group-item bg-dark border-0 text-white ps-0 pe-5">About Loop Cinema</li>
                            <li className="list-group-item bg-dark border-0 text-white ps-0 pe-5">Accessibility</li>
                            <li className="list-group-item bg-dark border-0 text-white ps-0 pe-5">FAQ</li>
                            <li className="list-group-item bg-dark border-0 text-white ps-0 pe-5">Policies</li>
                            <li className="list-group-item bg-dark border-0 text-white ps-0 pe-2">Contact Us</li>
                        </ul>
                    </div>
                </div>
                <hr className='text-light mb-0'/>
                <div className='row'>
                    <div className='col-5 '>
                    <span className='text-secondary  float-end align-baseline fs-7'>Copyright © 2023 LPCC. All Rights Reserved.</span>
                    </div>
                    <div className='col-7'>
                        <ul className='list-group list-group-horizontal bg-dark'>
                            <li className="list-group-item bg-dark border-0 text-white px-2">Terms & Conditions</li>
                            <span className='text-white fw-light'>|</span>
                            <li className="list-group-item bg-dark border-0 text-white px-2">Privacy Policy</li>
                            <span className='text-white fw-light'>|</span>
                            <li className="list-group-item bg-dark border-0 text-white px-2">Site developers</li>
                        </ul>
                    </div>
                </div>

            </div>
            
        
        
    );
};

export default Footer;