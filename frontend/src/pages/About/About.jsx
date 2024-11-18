// src/pages/About/About.jsx
import React from 'react';
import './About.css'; // Assuming you have a CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>CAN3 ON WHEELS</strong>, a food and beverages company founded in March 2023 at IIM Bodhgaya. Created by Anshul Gautam and Yuvraj Soni, we aim to transform campus dining by delivering high-quality, affordable, and delicious food options tailored for students and faculty.
      </p>
      <p>
        Our motto, <em>"Fueling Campus Life with Delicious Delights,"</em> reflects our passion for enriching the campus food experience with a variety of flavors, from traditional Indian dishes to international cuisines.
      </p>
      <p>
        Backed by the Envision Cell and Incubation Centre at IIM Bodhgaya, we benefit from guidance by experienced professors and consultants, enabling us to uphold the highest standards of quality, innovation, and sustainability.
      </p>
      <p>
        As we continue to grow, CAN3 ON WHEELS is dedicated to fostering community engagement, supporting local businesses, and setting a new standard for campus dining. We invite you to join us on this exciting culinary journey!
      </p>
    </div>
  );
};

export default About;
