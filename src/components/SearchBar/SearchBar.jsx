import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === '') {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <button type="submit" className={styles.searchButton}>
            ok
          </button>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search images and photos"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;

