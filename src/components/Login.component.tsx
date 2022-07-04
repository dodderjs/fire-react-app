import { Button } from '@mui/material';

export default function Login({signIn}: {signIn:any}) {
	return (
		<div>
		  <Button className="button" onClick={signIn} variant="contained"><i className="fab fa-google"></i>Sign in with google</Button>
		</div>
	);
}
