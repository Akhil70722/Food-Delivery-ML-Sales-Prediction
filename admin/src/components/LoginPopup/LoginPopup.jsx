import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ onClose }) => {
    const [data, setData] = useState({
        name: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
    
        const partnersUrl = `http://localhost:4000/api/delivery-partner`; // Endpoint to get all delivery partners
    
        try {
            // Fetch all delivery partners
            const response = await axios.get(partnersUrl, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // Adjust if auth is required
            });
    
            // Check if any delivery partner matches the input data
            const partner = response.data.find(
                (partner) => partner.name === data.name && partner.phone === data.phone
            );
    
            if (partner) {
                // Store partner information in localStorage
                localStorage.setItem("loggedInPartner", JSON.stringify(partner));
                toast.success("Login successful!");
                onClose(); // Close the login popup
            } else {
                throw new Error("Delivery partner not found. Please try again.");
            }
        } catch (error) {
            toast.error(error.message || "Login failed. Please try again.");
        }
    };
    
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>Login</h2> 
                    <img onClick={onClose} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    <input 
                        name='name' 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        placeholder='Name' 
                        required 
                    />
                </div>
                <div className="login-popup-inputs">
                    <input 
                        name='phone' 
                        onChange={onChangeHandler} 
                        value={data.phone} 
                        type="text" 
                        placeholder='Phone Number' 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPopup;
