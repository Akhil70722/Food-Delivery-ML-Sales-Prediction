import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ items }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    // Filter items based on search input
    const filtered = items.filter((item) => 
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img className="logo" src={assets.logo} alt="Logo" />
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          {searchInput && (
            <div className="search-results">
              {filteredItems.map((item) => (
                <div key={item.id} className="search-item">
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <FontAwesomeIcon icon={faBell} className="navbar-icon" title="Notifications" />
        <FontAwesomeIcon icon={faCog} className="navbar-icon" title="Settings" />
        <img className="profile" src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
