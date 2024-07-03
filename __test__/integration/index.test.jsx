import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { setupStoreAndRouter } from '../setupTestsUtils'; // Adjust the import path as needed
import mockPopularMovies from "../../__mocks__/popular.json"
import mockMovie from "../../__mocks__/movie.json"

import userEvent from '@testing-library/user-event';

// Mock API endpoint
const server = setupServer(
    http.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
        return HttpResponse.json(mockPopularMovies);
    }),
    http.get('https://api.themoviedb.org/3/movie/786892?append_to_response=recommendations',(req, res, ctx) => {
        return HttpResponse.json(mockMovie);
    })

);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('Integration Test', () => {
    it('renders popular movies on homepage load', async () => {
        const { store, router } = setupStoreAndRouter();

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        // Verify that the popular movies are displayed
        await waitFor(() => {
            expect(screen.getByText('Furiosa: A Mad Max Saga')).toBeInTheDocument();
            expect(screen.getByText('Inside Out 2')).toBeInTheDocument();
        });
    });
    it('clicks on the movie "Furiosa: A Mad Max Saga" and navigates to its details page', async () => {
        const { store, router } = setupStoreAndRouter();

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        // Verify that the popular movies are displayed
        await waitFor(() => {
            expect(screen.getByText('Furiosa: A Mad Max Saga')).toBeInTheDocument();
        });

        // Click on the movie "Furiosa: A Mad Max Saga"
        userEvent.click(screen.getByText('Furiosa: A Mad Max Saga'));

        // Verify that the movie details page is displayed
        await waitFor(() => {
            expect(screen.getByText(/young Furiosa is snatched from the Green Place of Many Mothers/i)).toBeInTheDocument();
        });
    });
});
