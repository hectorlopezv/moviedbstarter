import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import{ getMovie, resetState } from "../../redux/movie";
import Loader from "../../components/loader";
import Movie from "../../components/movie";



const MovieDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const {id} = params;
    const  {genres}  = useSelector((store) => store.genres);
    const movie = useSelector((store) => store.movie);

    useEffect(() => {
        dispatch(getMovie(id ? parseInt(id, 10) : 0));

        return () => {
            dispatch(resetState());
        }
    }, [dispatch, id]);

    useEffect( () => {
        if (id !== movie.id?.toString()) {
            dispatch(getMovie(id ? parseInt(id, 10) : 0));
        }
    }, [id, movie.id]);

    return (
        movie.isFetching ? <Loader /> : <Movie movie={movie} genres={genres} />
    );
}

export default MovieDetails;