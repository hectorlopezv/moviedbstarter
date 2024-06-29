import { useSelector } from "react-redux";
import Suggestion from "./suggestion";

const SearchMoviesSuggestion = () => {

    const { search } = useSelector((store) => store);
    const { genres } = useSelector((store) => store.genres);
    
    return (<Suggestion movies={search} genres={genres} />);
}

export default SearchMoviesSuggestion;