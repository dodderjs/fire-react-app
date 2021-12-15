import { Movie } from '../../movie';
import MovieCard from './MovieCard.component';
import MovieCardSkeleton from './MovieCardSkeleton.component';
import './MovieList.component.css';

interface MovielistProps {
	movies: Movie[],
	pageSize?: number,
	loading?: boolean
}

const MovieList = (props: MovielistProps) => {
	const empty = new Array(props.pageSize).fill(1);

	return (
		<div className="movie-list">
			{props.loading ?
				empty.map(() => <MovieCardSkeleton className="movie-list__item" />) :
				props.movies.map((movie: Movie) => <MovieCard  key={movie.id}  movie={movie} className="movie-list__item"/>)
			}
		</div>
	)
}

export default MovieList;
