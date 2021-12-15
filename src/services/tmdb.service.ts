import { fetchJSON } from './fetch.service';
import environment from '../environments/environment';
import {TMDBMovie, TMDBMovieDetail} from '../movie';
import {Singleton} from '../decorators/signleton';

@Singleton
class TmdbService {
	public async getMovieById(id: string | number): Promise<TMDBMovieDetail> {
		const data: TMDBMovieDetail = await fetchJSON(`${environment.tmdb.baseUrl}/movie/${id}?api_key=${environment.tmdb.apikey}&language=en-US&append_to_response=videos`);

		return {
			...data,
			poster_path: data.poster_path ? `${environment.tmdb.imageUrl}/w300${data.poster_path}` : 'https://via.placeholder.com/300x400',
			backdrop_path: data.backdrop_path ? `${environment.tmdb.imageUrl}/w1920_and_h800_multi_faces/${data.backdrop_path}` : undefined
		};
	}

	public async searchMovies(searchText:string, page=1): Promise<TMDBMovie[]> {
		const data: TmdbResponse = await fetchJSON(`${environment.tmdb.baseUrl}/search/movie?api_key=${environment.tmdb.apikey}&language=en-US&query=${searchText}&page=${page}`);

		return this.processData(data);
	}

	public async getMovies(list = 'upcoming', page = 1): Promise<TMDBMovie[]> {
		const data: TmdbResponse = await fetchJSON(`${environment.tmdb.baseUrl}/movie/${list}?api_key=${environment.tmdb.apikey}&language=en-US&page=${page}`);

		return this.processData(data);
	}

	private processData(data: TmdbResponse): TMDBMovie[] {
		return (data.results || []).map(movie => ({
			...movie,
			image: movie.poster_path ? `${environment.tmdb.imageUrl}/w300${movie.poster_path}` : 'https://via.placeholder.com/300x400/0d0d0d/FFFFFF/?text=No%20Image',
			release_date: movie.release_date && new Date(movie.release_date) || null
		}));
	}
}

export interface TmdbResponse {
	page: number;
	results: TMDBMovie[];
	dates: {
		maximum: string;
		minimum: string;
	};
	total_pages: number;
	total_results: number;
}

export default new TmdbService();
