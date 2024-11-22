// src/components/CustomerProfiles/CustomerProfiles.jsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './CustomerProfiles.css';

const CustomerProfiles = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const response = await axios.post('/api/customers/add', data);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                name: '',
                email: '',
                phone: '',
                address: '',
            });
        } else {
            toast.error(response.data.message);
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='customer-profiles'>
            <h2>Add Customer Profile</h2>
            <form onSubmit={onSubmitHandler}>
                <input
                    name='name'
                    onChange={onChangeHandler}
                    value={data.name}
                    type='text'
                    placeholder='Customer Name'
                    required
                />
                <input
                    name='email'
                    onChange={onChangeHandler}
                    value={data.email}
                    type='email'
                    placeholder='Email'
                    required
                />
                <input
                    name='phone'
                    onChange={onChangeHandler}
                    value={data.phone}
                    type='tel'
                    placeholder='Phone Number'
                    required
                />
                <input
                    name='address'
                    onChange={onChangeHandler}
                    value={data.address}
                    type='text'
                    placeholder='Address'
                    required
                />
                <button type='submit'>Add Customer</button>
            </form>
        </div>
    );
};

export default CustomerProfiles;
