import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import '../ThemeToggleButton/ThemeToggleButton.css';

const Navbar = ({ setShowLogin }) => {
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter' && searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm(''); // Clear the search box after submitting the query
        }
    };

    return (
        <div className='navbar'>
            <Link to='/' aria-label="Go to homepage">
                <img className='logo' src={assets.logo} alt="Company Logo" />
            </Link>
            <ul className="navbar-menu">
                <Link to="/">Home</Link>
                <a href='#explore-menu'>Menu</a>
                <a href='#app-download'>Mobile App</a>
                <a href='#footer'>Contact Us</a>
                {/* Added Help & Support Link */}
                <Link to='/help' aria-label="Go to Help & Support">Help & Support</Link>
            </ul>
            <div className="navbar-right">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch} // Handle Enter key press
                    className="navbar-search-input"
                    aria-label="Search"
                />
                <Link to='/cart' className='navbar-search-icon' aria-label="View cart">
                    <img src={assets.basket_icon} alt="Cart Icon" />
                    {getTotalCartAmount() > 0 && <div className="dot"></div>}
                </Link>
                <ThemeToggleButton />
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="User Profile" />
                        <ul className='navbar-profile-dropdown'>
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="Orders" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
