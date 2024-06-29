import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    results: [],
    totalResults: 0,
    page: 0,
    totalPages: 0,
    isFetching: false
};

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        searchMovies: (state) => {
            return {
                ...state,
                isFetching: true
            };
        },
        fetchedSearchMovies: (state, action) => {
            return {
                ...state,
                isFetching: false,
                results: action.payload.results,
                totalResults: action.payload.total_results,
                page: action.payload.page,
                totalPages: action.payload.total_pages
            };
        },
        resetState: (state) => {
            return initialState;
        }
    }
});

export const { searchMovies, fetchedSearchMovies, resetState } = searchSlice.actions;

export default searchSlice.reducer;