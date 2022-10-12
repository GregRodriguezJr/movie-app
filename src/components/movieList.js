
const MovieList = (props) => {
    const baseImgUrl = "https://image.tmdb.org/t/p/w500";
    return (
        <>
            {props.movies.map((movie, index) => <div>
                <img src={baseImgUrl + movie.poster_path} />
            </div>)}
        </>
    )
}

export default MovieList;