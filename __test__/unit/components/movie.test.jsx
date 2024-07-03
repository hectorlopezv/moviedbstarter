import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Movie from '../../../src/components/movie';
import { COVER_PLACEHOLDER, IMAGES_PATH } from '../../../src/config';

const mockMovie = {
    title: "Furiosa: A Mad Max Saga",
    poster_path: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    tagline: "Fury is born.",
    genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 878, name: "Science Fiction" }
    ],
    production_countries: [
        { iso_3166_1: "AU", name: "Australia" },
        { iso_3166_1: "US", name: "United States of America" }
    ],
    runtime: 149,
    release_date: "2024-05-22",
    overview: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus.",
    recommendations:null,

};

const mockGenres = [
];

vi.mock("../../../src/components/search-movie-suggestion.jsx",()=>{
    return <div>Search Movie Suggestion</div>
});
describe('Movie Component', () => {
    it('renders movie details correctly', () => {
        render(<Movie movie={mockMovie} genres={mockGenres} />);

        // Verify title
        expect(screen.getByText("Furiosa: A Mad Max Saga")).toBeInTheDocument();

        // Verify tagline
        expect(screen.getByText("Tagline:")).toBeInTheDocument();
        expect(screen.getByText("Fury is born.")).toBeInTheDocument();

        // Verify genres
        expect(screen.getByText("Genres:")).toBeInTheDocument();
        expect(screen.getByText("Action, Adventure, Science Fiction")).toBeInTheDocument();

        // Verify production countries
        expect(screen.getByText("Country:")).toBeInTheDocument();
        expect(screen.getByText("Australia, United States of America")).toBeInTheDocument();

        // Verify runtime
        expect(screen.getByText("Duration:")).toBeInTheDocument();
        expect(screen.getByText("2h 29m")).toBeInTheDocument();

        // Verify release date
        expect(screen.getByText("Release Date:")).toBeInTheDocument();
        expect(screen.getByText("May 21, 2024")).toBeInTheDocument();

        // Verify overview
        expect(screen.getByText("Overview:")).toBeInTheDocument();
        expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    });

    it('renders placeholder image when poster_path is missing', () => {
        const movieWithoutPoster = { ...mockMovie, poster_path: null };
        render(<Movie movie={movieWithoutPoster} genres={mockGenres} />);

        const img = screen.getByAltText("Furiosa: A Mad Max Saga");
        expect(img).toHaveAttribute('src', COVER_PLACEHOLDER);
    });

    it('renders correct image when poster_path is present', () => {
        render(<Movie movie={mockMovie} genres={mockGenres} />);

        const img = screen.getByAltText("Furiosa: A Mad Max Saga");
        expect(img).toHaveAttribute('src', `${IMAGES_PATH}/w300${mockMovie.poster_path}`);
    });
});
