// src/components/SupplierManagement/SupplierManagement.jsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './SupplierManagement.css';

const SupplierManagement = () => {
    const [data, setData] = useState({
        name: '',
        contact: '',
        productsSupplied: '',
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const response = await axios.post('/api/suppliers/add', data);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                name: '',
                contact: '',
                productsSupplied: '',
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
        <div className='supplier-management'>
            <h2>Add Supplier</h2>
            <form onSubmit={onSubmitHandler}>
                <input
                    name='name'
                    onChange={onChangeHandler}
                    value={data.name}
                    type='text'
                    placeholder='Supplier Name'
                    required
                />
                <input
                    name='contact'
                    onChange={onChangeHandler}
                    value={data.contact}
                    type='text'
                    placeholder='Contact Number'
                    required
                />
                <input
                    name='productsSupplied'
                    onChange={onChangeHandler}
                    value={data.productsSupplied}
                    type='text'
                    placeholder='Products Supplied'
                    required
                />
                <button type='submit'>Add Supplier</button>
            </form>
        </div>
    );
};

export default SupplierManagement;
