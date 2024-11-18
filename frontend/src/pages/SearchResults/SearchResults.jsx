// src/pages/SearchResults/SearchResults.jsx
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
// import FoodItem from '../../FoodItem/FoodItem'
import FoodItem from '../../components/FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const SearchResults = ({ items }) => {
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get('query') || '';
  const {food_list} = useContext(StoreContext);
  console.log(food_list)
  const filteredItems = food_list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredItems)

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <div className='food-display-list'>

        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            // <li key={item.id}>{item.name}</li>
          // if (category==="All" || category===item.category) {
            <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
          // }
          ))
        ) : (
          <li>No results found.</li>
        )}
      </div>
      {/* <ul> */}
      {/* </ul> */}
    </div>
  );
};

export default SearchResults;
