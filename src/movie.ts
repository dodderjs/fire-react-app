export interface Movie {
	homepage: string;
	release_date: Date;
	id: string;
	imdb_id: string;
	title: string;
	lastUploadedAt?: Date;
	image: string;
	release_year: number;
	plot: string;
	runtime: number;
	imdb_rank: number;
}

enum Status {
	'Rumored',
	'In Production',
	'Planned',
	'Post Production',
	'Released',
	'Canceled'
}
export interface TMDBMovie {
	homepage: string;
	release_date?: Date|null;
	id: string;
	imdb_id: string;
	title: string;
	poster_path?: string;
	adult?: boolean;
	overview?: string;
	genre_ids?: number[];
	original_title?: string;
	original_language?: string;
	backdrop_path?: string;
	popularity?: number;
	vote_count?: number;
	video?: boolean;
	vote_average?: number;
	lastUploadedAt?: Date;
	image: string;
	release_year: number;
	plot: string;
	runtime: number;
	imdb_rank?: number;
}
export interface TMDBMovieDetail {
	adult: boolean;
	backdrop_path: string | undefined;
	belongs_to_collection: null | object;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string | undefined;
	popularity: number;
	poster_path: string | undefined;
	production_companies: {
		name: string;
		id: number;
		logo_path: string | null;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string;
	revenue: number;
	runtime: number | null;
	spoken_languages: {
		iso_639_1: string;
		name: string;
	}[];
	status: Status;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	videos: {
	results: {
		id: string;
		iso_639_1: string;
		iso_3166_1: string;
		key: string;
		name: string;
		site: string;
		size: number;
		type: string;
	}[];
	};
}
