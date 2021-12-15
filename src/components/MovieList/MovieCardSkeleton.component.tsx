import { Card, CardContent, Skeleton } from '@mui/material';

export default function MovieCardSkeleton(props: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={props.className}>
			<Card className='movie-list__item__inner'>
				<Skeleton sx={{ width: '100%' }} animation="wave" variant="rectangular" />
					<span className="movie-list__item__details">
					<CardContent>
						<Skeleton animation="wave" variant="rectangular" width={'90%'} height={10}  style={{ marginBottom: 6 }} />
						<Skeleton animation="wave" variant="rectangular" width={'90%'} height={10} />
					</CardContent>
					</span>
			</Card>
		</div>
		);
}
