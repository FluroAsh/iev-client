import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

export const SearchBar = ({ setMenuOpen }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedInput = input.trim().replace(/\s+/, '+');
    navigate(`/search?location=${formattedInput}`);
    setInput('');
    isMobile && setMenuOpen(false);
  };

  const handleChange = (e) => {
    setInput(e.target.value) 
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
