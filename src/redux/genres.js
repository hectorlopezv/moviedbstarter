import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres: [],
    isFetching: false
};

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {
        getGenres: (state) => {
            return {
                ...state,
                isFetching: true
            }
        },
        fetchedGenres: (state, action) => {
            return {
                ...state,
                genres: action.payload.genres,
                isFetching: false
            }
        },
        reseteState: (state) => {
            return initialState
        }
    }
});

export const { getGenres, fetchedGenres, reseteState } = genresSlice.actions;

export default genresSlice.reducer;