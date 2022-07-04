import { Movie, TMDBMovie, TMDBMovieDetail } from '../movie';
import {tmdbService} from './tmdb.service';
import { uniqBy } from 'lodash';
import { fireService } from './firebase.service';


class StoreService {
	pageSize = 50;
	lastVisible:any;

	async searchMovies(queryText:string):Promise<Movie[]> {
		const tMovies = await tmdbService.searchMovies(queryText);
		const onlineMovies = await fireService.moviesByMap(uniqBy(tMovies, 'id').slice(0, 9).map(t => t.id.toString()), this.pageSize);
		const foundIds = onlineMovies.map(v => v.id);
		return onlineMovies.concat(tMovies.filter(v => !foundIds.includes(v.id.toString())) as Movie[])
	}

	async getOnlineMovies(filter='', page = 1):Promise<Movie[]> {
		const result = filter ? await this.searchMovies(filter) : await fireService.onlineMovies(page, this.pageSize);
		return result;
	}

	async getMovieById(id: string | number): Promise<TMDBMovieDetail | null> {
		try {
			return tmdbService.getMovieById(id);
		} catch (e: any) {
			return this.handleError<TMDBMovieDetail | null>('getMovie', null)(e);
		}
	}

	async getMovies(list = 'upcoming', page = 1): Promise<TMDBMovie[]> {
		try {
			return tmdbService.getMovies(list, page);
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

let instance:StoreService;
const StoreFactory = {
	getInstance: function () {
		if (!instance) {
			instance = new StoreService();
		}
		return instance;
	}
};
export const storeService = StoreFactory.getInstance();
