import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import PopularMovies from "../routes/popular-movies";
import ErrorPage from "../components/error";
import Root from "../routes/root";
import MovieDetails from "../routes/movie-details";


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Root />}
        errorElement={<ErrorPage />}
      >
        <Route errorElement={<ErrorPage />}>
          <Route index element={<PopularMovies />} />
          <Route
            path="movie/:id"
            element={<MovieDetails />}
          />
        </Route>
      </Route>
    )
  );


  export default router;