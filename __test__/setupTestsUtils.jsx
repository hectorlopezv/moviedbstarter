import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../src/redux/search';
import genresReducer from '../src/redux/genres';
import moviesReducer from '../src/redux/movies';
import movieReducer from '../src/redux/movie';
import watcherSaga from '../src/redux/sagas';
import Layout from '../src/components/layout';
import ErrorPage from '../src/components/error';
import PopularMovies from '../src/routes/popular-movies';
import MovieDetails from '../src/routes/movie-details';

export const setupStoreAndRouter = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: {
            search: searchReducer,
            genres: genresReducer,
            movies: moviesReducer,
            movie: movieReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(watcherSaga);

    const routes = [
        {
            path: '/',
            element: <Layout>
                <Outlet />
            </Layout>,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/',
                    element: <PopularMovies />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: 'movie/:id',
                    element: <MovieDetails />,
                },
            ],
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ['/'],
    });

    return { store, router };
};
