export default class TheMovieDbApi {
    apiBaseUrl = 'https://api.themoviedb.org/3';
    apiKey;

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    getPopularMovies = async (page = 1) => {
        const response = await fetch(
        `${this.apiBaseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
        );

        return response.json();
    }

    getMovie = async (id) => {
        const response = await fetch(
        `${this.apiBaseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=recommendations`
        );

        
        return await response.json();
       
    }

    searchMovies = async (query) => {
        const response = await fetch(
        `${this.apiBaseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
        );

        return response.json();
    }

    getGenres = async () => {
        const response = await fetch(
        `${this.apiBaseUrl}/genre/movie/list?api_key=${this.apiKey}`
        );

        return response.json();
    }
}