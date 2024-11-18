import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Company Logo" />
          <p>CAN3 ON WHEELS - Fueling campus life with delicious delights. Founded in 2023 at IIM Bodhgaya, we’re committed to high-quality, tasty, and affordable food options for the campus community.</p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook Icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter Icon" />
            </a>
            <a href="https://www.linkedin.com/company/can3onwheels/" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn Icon" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTACT US</h2>
          <ul>
            <li><Link to="/help-support">Help & Support</Link></li>
            <li>+1-212-456-7890</li>
            <li>
              {/* Email with mailto link */}
              <a href="mailto:can3onwheels@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                contact@can3onwheels.com
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-content-legal">
          <h2>LEGAL</h2>
          <ul>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © CAN3 ON WHEELS - All Right Reserved.</p>
    </div>
  );
}

export default Footer;
