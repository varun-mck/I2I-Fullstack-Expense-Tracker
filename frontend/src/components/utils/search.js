/**
 * Utility functions for handling search operations
 */

/**
 * Builds a search query based on advanced search criteria.
 *
 * @param {Object} criteria - The search criteria.
 * @returns {Object} - The search query object.
 */
export function buildSearchQuery(criteria) {
    if (!criteria || typeof criteria !== 'object') {
        throw new Error("Invalid search criteria");
    }

    const query = {};

    if (criteria.keywords) {
        query.keywords = criteria.keywords.toString();
    }

    if (criteria.dateFrom && criteria.dateTo) {
        const fromDate = new Date(criteria.dateFrom);
        const toDate = new Date(criteria.dateTo);

        if (fromDate > toDate) {
            throw new Error("Invalid date range");
        }

        query.date = {
            $gte: fromDate,
            $lte: toDate,
        };
    }

    if (criteria.tags && Array.isArray(criteria.tags)) {
        query.tags = { $in: criteria.tags };
    }

    return query;
}

/**
 * Processes and displays search results based on the query.
 *
 * @param {Object} query - The search query.
 * @returns {Promise<Array>} - A promise that resolves to a list of search results.
 */
export async function handleSearchResults(query) {
    if (!query || typeof query !== 'object') {
        throw new Error("Invalid search query");
    }

    // Simulate fetching search results from an API
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch search results");
        }

        const results = await response.json();
        return results;
    } catch (error) {
        throw new Error(`An error occurred while processing the search results: ${error.message}`);
    }
}
