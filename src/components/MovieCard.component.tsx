import { Card, CardContent, CardMedia, Typography, Badge } from '@mui/material';
import { Movie } from '../movie';

export default function MovieCard(props: { movie: Movie } & React.HTMLAttributes<HTMLDivElement>) {
	const movie = props.movie;
	// const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
	//const styles = useStyles();

	return (
		<div className={props.className}>
			<Badge badgeContent={'New'} color="primary"  invisible={!movie.is_new}>
			<Card>
				<CardMedia
					component="img"
					image={movie.poster_path}
					alt={movie.title}
				/>
				<CardContent>
					<Typography variant="body2" component="p">
						{movie.original_title}
					</Typography>
					<Typography gutterBottom variant="h6" component="h6">
						{movie.title}
					</Typography>
					<Typography variant="body2" component="p">
						{ movie.release_date && movie.release_date.toLocaleDateString() }
					</Typography>
				</CardContent>
			</Card>
			</Badge>
		</div>
	);
}
