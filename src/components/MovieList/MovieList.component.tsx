import { Button, Grid } from '@mui/material';
import { Fragment } from 'react';
import { Movie } from '../../movie';
import MovieCard from './MovieCard.component';
import MovieCardSkeleton from './MovieCardSkeleton.component';
import './MovieList.component.css';

interface MovielistProps {
	movies: Movie[],
	pageSize?: number,
	loading?: boolean,
	nextPage?: () => {}
}

const MovieList = ({loading, movies, pageSize, nextPage}: MovielistProps) => {
	const empty = new Array(pageSize).fill(1);

	const Loading = () => empty.map(() => <MovieCardSkeleton className="movie-list__item" />)
	return (<Fragment>
		<div className="movie-list">
			{loading && !movies.length ?
				Loading() :
				movies.map((movie: Movie) => <MovieCard  key={movie.id}  movie={movie} className="movie-list__item"/>)
			}
			{loading && movies.length && Loading() }
		</div>
		<Grid item xs={12} textAlign='center' style={{margin: '10px 0 30px'}}>
			<Button variant="contained" onClick={nextPage}>Load more</Button>
		</Grid>
		</Fragment>)
}

export default MovieList;
