import "./MovieCard.css";

export const MovieCard = ({movie}) =>{
    const { Title, Year, Poster, Type, imdbID } = movie;
    return (
        <div className="card-container">
            <div className="card-image-container">
                <img className="card-img" src={Poster} alt="movie-card" />
            </div>
            <div className="card-details">
                <div>
                    <span className="title">{Title}</span>
                </div>
                <div>
                    <span className="type">Type: {Type}</span>
                </div>
                <div className="year">
                    <span>Rating: {Year}</span>
                </div>
            </div>
            

        </div>
    )
}