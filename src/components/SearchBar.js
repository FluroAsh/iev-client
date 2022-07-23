import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ setMenuOpen }) => {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedInput = input.trim().replace(/\s+/, '+');
    navigate(`/search?location=${formattedInput}`);
    setMenuOpen(false);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form id="searchbar-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        name="searchbar"
        id="searchbar"
        placeholder="Where to?"
      />
    </form>
  );
};
