import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [sortOption, setSortOption] = useState("");
  const [filterType, setFilterType] = useState('all'); // all | veg | non-veg

  const handleToggle = (type) => {
    setFilterType(type);
  };

  const filteredFoodList = food_list.filter((item) => {
    const matchCategory = category === item.category || category === 'All';
    const matchType =
      filterType === 'all' ||
      (filterType === 'veg' && item.type === 'veg') ||
      (filterType === 'non-veg' && item.type === 'nonveg');
    return matchCategory && matchType;
  });
    if (sortOption === "alpha-asc") {
  filteredFoodList.sort((a, b) => a.name.localeCompare(b.name));
} else if (sortOption === "alpha-desc") {
  filteredFoodList.sort((a, b) => b.name.localeCompare(a.name));
} else if (sortOption === "price-asc") {
  filteredFoodList.sort((a, b) => a.price - b.price);
} else if (sortOption === "price-desc") {
  filteredFoodList.sort((a, b) => b.price - a.price);
}

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      
      <div className="contt">
        {/* Toggle Buttons */}
      <div className="filter-toggle">
        <button
          className={filterType === 'all' ? 'active' : ''}
          onClick={() => handleToggle('all')}
        >
          All
        </button>
        <button
          className={filterType === 'veg' ? 'active' : ''}
          onClick={() => handleToggle('veg')}
        >
          Veg
        </button>
        <button
          className={filterType === 'non-veg' ? 'active' : ''}
          onClick={() => handleToggle('non-veg')}
        >
          Non-Veg
        </button>
      </div>
      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">None</option>
          <option value="alpha-asc">Alphabet (A → Z)</option>
          <option value="alpha-desc">Alphabet (Z → A)</option>
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
        </select>
      </div>
      </div>

      <div className='food-display-list'>
        {filteredFoodList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay