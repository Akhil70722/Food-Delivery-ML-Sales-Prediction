import React from 'react';
import './Header.css';

const Header = () => {
    const scrollToMenu = () => {
        const menuSection = document.getElementById('explore-menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the menu section
        }
    };

    return (
        <div className='header'>
            <div className='header-contents'>
                <h2 className='z-[-10]'>Order your favourite food here</h2>
                <p>
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
                    Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                {/* Button with onClick event to scroll to the menu section */}
                <button onClick={scrollToMenu}>View Menu</button>
            </div>
        </div>
    );
}

export default Header;
