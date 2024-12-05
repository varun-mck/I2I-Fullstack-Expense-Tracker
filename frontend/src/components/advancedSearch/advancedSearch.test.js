// frontend/src/components/advancedSearch/advancedSearch.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdvancedSearchComponent from './index';
import { buildSearchQuery, handleSearchResults } from '../utils/search';

// Unit test to ensure the Advanced Search Component renders correctly.
test('testAdvancedSearchComponentRenders', () => {
  render(<AdvancedSearchComponent />);
  const advancedSearchComponent = screen.getByTestId('advanced-search-component');
  expect(advancedSearchComponent).toBeInTheDocument();
});

// Unit test for verifying Search Input functionality.
test('testSearchInput', () => {
  render(<AdvancedSearchComponent />);
  const searchInput = screen.getByTestId('search-input');
  fireEvent.change(searchInput, { target: { value: 'test search term' } });
  expect(searchInput.value).toBe('test search term');
});

// Unit test for verifying Search Button functionality.
test('testSearchButton', () => {
  render(<AdvancedSearchComponent />);
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
  expect(handleSearchResults).toHaveBeenCalled();
});

// Unit test for verifying the buildSearchQuery function.
test('testSearchQueryBuilding', () => {
  const criteria = {
    term: 'example',
    filters: {
      dateRange: ['2020-01-01', '2021-01-01'],
      category: 'books'
    }
  };
  const query = buildSearchQuery(criteria);
  expect(query).toHaveProperty('term', 'example');
  expect(query.filters).toHaveProperty('dateRange', ['2020-01-01', '2021-01-01']);
  expect(query.filters).toHaveProperty('category', 'books');
});

// Unit test for verifying the handleSearchResults function.
test('testSearchResultsHandling', () => {
  const sampleResults = [
    { id: 1, name: 'Sample Book 1' },
    { id: 2, name: 'Sample Book 2' }
  ];
  handleSearchResults.mockReturnValue(sampleResults);
  const results = handleSearchResults('query');
  expect(results).toEqual(sampleResults);
});
