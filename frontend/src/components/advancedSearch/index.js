// frontend/src/components/advancedSearch/index.js

import React, { useState } from 'react';
import styles from './advancedSearch.module.css';
import { buildSearchQuery, handleSearchResults } from '../utils/search';

const AdvancedSearchComponent = () => {
    const [criteria, setCriteria] = useState({});
    const [results, setResults] = useState([]);

    const handleCriteriaChange = (event) => {
        const { name, value } = event.target;
        setCriteria(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        try {
            const query = buildSearchQuery(criteria);
            const results = await handleSearchResults(query);
            setResults(results);
        } catch (error) {
            console.error('Error handling search: ', error);
            // Handle error appropriately in the UI (e.g., displaying an error message)
        }
    };

    return (
        <div className={styles.advancedSearchContainer}>
            <AdvancedSearchForm criteria={criteria} onCriteriaChange={handleCriteriaChange} />
            <SearchButton onSearch={handleSearch} />
            <SearchResults results={results} />
        </div>
    );
};

const SearchInput = ({ name, label, value, onChange }) => (
    <div className={styles.searchInput}>
        <label htmlFor={name}>{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
        />
    </div>
);

const SearchButton = ({ onSearch }) => (
    <button className={styles.searchButton} onClick={onSearch}>
        Search
    </button>
);

const AdvancedSearchForm = ({ criteria, onCriteriaChange }) => (
    <form className={styles.advancedSearchForm}>
        <SearchInput
            name="title"
            label="Title"
            value={criteria.title || ''}
            onChange={onCriteriaChange}
        />
        <SearchInput
            name="author"
            label="Author"
            value={criteria.author || ''}
            onChange={onCriteriaChange}
        />
        <SearchInput
            name="year"
            label="Year"
            value={criteria.year || ''}
            onChange={onCriteriaChange}
        />
        {/* Add more search fields as needed */}
    </form>
);

const SearchResults = ({ results }) => (
    <ul className={styles.searchResults}>
        {results.map((result, index) => (
            <li key={index}>{result}</li>
        ))}
    </ul>
);

export default AdvancedSearchComponent;
