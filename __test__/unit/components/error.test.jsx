import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../../../src/components/error';
import { useRouteError } from 'react-router-dom';


// Mocking react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useRouteError: vi.fn(),
    };
});

describe('ErrorPage', () => {
    it('should render error page with title "Oops! and Not Found"', () => {
        useRouteError.mockReturnValue({ statusText: 'Not Found' });
        render(<ErrorPage />);
        expect(screen.getByText('Not Found')).toBeInTheDocument();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });
});

