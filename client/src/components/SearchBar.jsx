import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const { push } = useHistory();
  const [formState, setFormstate] = useState({
    query: '',
    cuisineType: '',
    radius: 5,
  });

  const cuisineTypes = [
    'American',
    'Mexican',
    'Greek',
    'SeaFood',
    'Vegan Exclusive',
    'Vegetarian',
    'Chinese',
    'Thai',
    'Dessert',
    'Italian',
    'Filipino',
    'Kosher',
  ];

  const onInputChange = (e) => {
    setFormstate({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    // props.searchForTrucks(formState);
    push('/search-results');
  };

  return (
    <div className="home-header">
      <h1>Find the Right Truck for You</h1>
      <form onSubmit={submit} className="searchBarContainer" inline>
        <div>
          <input
            onChange={onInputChange}
            type="search"
            name="query"
            id="query"
            placeholder="City, State, USA"
          />
        </div>
        <select onChange={onInputChange} type="select" name="cuisineType">
          <option disabled defaultValue=" ">
            -- Select a cuisine type --
          </option>
          {cuisineTypes.map((cuisineType) => (
            <option key={cuisineType} value={cuisineType}>
              {cuisineType}
            </option>
          ))}
        </select>
        <select onChange={onInputChange} type="select" name="radius">
          <option value={5}>within 5 miles</option>
          <option value={10}>within 10 miles</option>
          <option value={15}>within 15 miles</option>
          <option value={20}>within 20 miles</option>
        </select>
        <button type="submit" style={{ backgroundColor: 'rgb(0, 150, 250)' }}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
