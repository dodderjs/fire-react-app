import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Login from '../components/Login.component';
import {WithLoading} from '../components/WithLoading';
import { AuthContext } from '../providers/auth.provider';

function LoginPage(props:any) {
	const location = useLocation();

	if (props.user) {
	  return <Navigate to={location?.state?.from !== '/login' && location?.state?.from || '/'} replace />;
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
			<Login signIn={props.signIn}/>
		</Grid>
	  </Grid> );
  }

  export default WithLoading(LoginPage);

