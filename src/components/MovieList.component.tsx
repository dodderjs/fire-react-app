import { Component } from 'react';
import { Movie } from '../movie';
import storeService from '../services/store.service';
import MovieCard from './MovieCard.component';
import Grid from '@mui/material/Grid';
import './MovieList.component.css';

interface MovielistProps {
	pageSize: number
}
interface MovielistState {
	movies: Movie[]
}

class MovieList extends Component<MovielistProps, MovielistState> {

	constructor(props: MovielistProps) {
		super(props);
		this.state = {
			movies: []
		}
	}

	componentDidMount() {
		const { pageSize } = this.props;
		storeService.pageSize = pageSize;
		storeService.getOnlineMovies().then((data: Movie[]) => { this.setState({ movies: data }) })
		// storeService.getOnlineMovies().then(console.log)
	}

	render() {
		return (
			<div className="movie-list">
				{this.state.movies.map((movie: Movie) =>
					<MovieCard  key={movie.id}  movie={movie} className="movie-list__item"/>
				)}
			</div>
		);
	}
/*
	render() {
		return (
			<div className="movie-list">
				<Grid container spacing={0.5}
					columns={{ xs: 1, sm: 2, md: 3, lg: 8, xl: 10 }}>
					{this.state.movies.map((movie: Movie) =>
						<Grid key={movie.id} item xs={1} sm={1} md={1} lg={1} xl={1}>
							<MovieCard movie={movie} />
						</Grid>
					)}
				</Grid>
			</div>
		);
	}*/
}

export default MovieList;
