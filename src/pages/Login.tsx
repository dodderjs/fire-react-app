import {MouseEvent} from 'react';
import User from '../services/user.service';
import { Button, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
	let navigate = useNavigate();
	let location = useLocation();

	let from = location.state?.from?.pathname || "/";

	const onClick = (event:MouseEvent<HTMLElement>) => {
		event.preventDefault();

		User.signIn().then(() => {
			navigate(from, { replace: true });
		});
	}

	return (<Grid
		container
		spacing={0}
		direction="column"
		alignItems="center"
		justifyContent="center"
		style={{ minHeight: '100vh' }}
	  >
		<Grid item xs={3}>
		  <Button className="button" onClick={ onClick } variant="contained"><i className="fab fa-google"></i>Sign in with google</Button>
		</Grid>

	  </Grid> );
  }

  export default LoginPage;
