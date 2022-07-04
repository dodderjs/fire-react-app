import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Movie } from '../../movie';
import { userService } from '../../services/user.service';

export default function MovieCard(props: { movie: Movie } & React.HTMLAttributes<HTMLDivElement>) {
	const movie = props.movie;

	return (
		<div className={`${props.className} ${!movie.lastUploadedAt ? 'offline' : ''}`}>
			<CardActionArea href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank">
				<Card style={{ backgroundImage: `url("${movie.image}")` }} className='movie-list__item__inner'>
						<span className="movie-list__item__details">
						<CardContent>
						<Typography variant="body2" component="p">
								{ movie.imdb_rank > 7 && <NewReleasesIcon /> }
								{ !movie.lastUploadedAt && <CloudOffIcon /> }
								{ movie.lastUploadedAt && userService.isItNew(movie.lastUploadedAt) && <FiberNewIcon /> }
							</Typography>
							<Typography gutterBottom variant="h6" component="h6">
								{movie.title}
							</Typography>
							<Typography variant="body2" component="p">
							{ [movie.imdb_rank, movie.release_date && movie.release_date.toLocaleDateString()].filter((v) => v !== undefined).join('|') }
							</Typography>
						</CardContent>
						</span>
				</Card>
			</CardActionArea>
		</div>
		);
}
