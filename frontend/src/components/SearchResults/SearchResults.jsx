import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { food_list } from '../../assets/assets'; // Ensure the path is correct
import FoodItem from '../FoodItem/FoodItem';
import './SearchResults.css'; // Adjust path as necessary


const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const filteredItems = food_list.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredItems);
        }
    }, [query]);

    return (
        <div className='search-results'>
            <h2>Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <div className="food-items-container">
                    {results.map(item => (
                        <FoodItem
                            key={item._id} // Use _id as key
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            desc={item.description} // Use description prop
                            id={item._id} // Use _id as id
                        />
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
