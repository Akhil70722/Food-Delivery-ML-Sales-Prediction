// src/components/CustomerProfiles/CustomerProfiles.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CustomerProfiles.css';

const CustomerProfiles = () => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/user');
            setCustomers(res.data);
        } catch (error) {
            console.log(error);
    }};

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className='customer-profiles'>
            <h1>Customer Profiles</h1>
                {customers.map((customer) => (
                    <div key={customer._id} className='customer-profile'>
                        <h3>Name: {customer.name}</h3>
                        <p>Email: {customer.email}</p>
                    </div>
                ))}
        </div>
    );
};

export default CustomerProfiles;
