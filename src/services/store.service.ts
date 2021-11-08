import { Movie, MovieDetail } from '../movie';
import FireService from './firebase.service';
import TmdbService from './tmdb.service';
import { Singleton } from '../decorators/signleton';


@Singleton
class StoreService {
	pageSize = 50;
	lastVisible:any;
	constructor() {}

	async getOnlineMovies(page = 1):Promise<Movie[]> {
		return await FireService.onlineMovies(page, this.pageSize);
	}

	async getMovieById(id: string | number): Promise<MovieDetail | null> {
		try {
			return TmdbService.getMovieById(id);
		} catch (e: any) {
			return this.handleError<MovieDetail | null>('getMovie', null)(e);
		}
	}

	async getMovies(list = 'upcoming', page = 1): Promise<Movie[]> {
		try {
			return TmdbService.getMovies(list, page);
		} catch (e: any) {
			return this.handleError<Movie[]>('getMovies', [])(e);
		}
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): T => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return result as T;
		};
	}


}
export default new StoreService();
