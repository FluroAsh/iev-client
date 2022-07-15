import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // need to fix this so it replaces spaces with '+' symbol...
    console.log('Submitted!', input);
    navigate(`/search?location=${input}`);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '35%' }}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        name="searchbar"
        id="searchbar"
        placeholder="Search..."
      />
    </form>
  );
};
