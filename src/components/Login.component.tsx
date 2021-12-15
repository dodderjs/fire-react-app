import { Button } from '@mui/material';
import User from '../services/user.service';

export default function Login() {
	return (
		<div>
		  <Button className="button" onClick={ User.signIn } variant="contained"><i className="fab fa-google"></i>Sign in with google</Button>
		</div>
	);
}
