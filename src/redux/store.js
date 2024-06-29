import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search";
import genresReducer from "./genres";

import moviesReducer from "./movies";
import movieReducer from "./movie";
import createSagaMiddleware from "@redux-saga/core";
import watcherSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        search: searchReducer,
        genres: genresReducer,
        movies: moviesReducer,
        movie: movieReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;