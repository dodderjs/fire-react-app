import { AppBar, Button, Divider, IconButton, InputBase, Toolbar, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import User from '../services/user.service';
import { FormEvent, useState, ChangeEvent } from 'react';

type NavProps = {
	search: string,
	onSearchChange: Function
}

const Nav = (props:NavProps) => {
	const [searchText, setSearchText] = useState(props.search);

	const onSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.onSearchChange(searchText);
	}

	function handleChange(event:ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Grid container component="form"
					sx={{ ml: 1, flex: 1 }}
					noValidate
					autoComplete="off"
					onSubmit={onSearch}>
					<Grid item component={InputBase}
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search"
						inputProps={{ 'aria-label': 'search google maps' }}
						value={searchText}
						onChange={handleChange}
					/>
					<Grid item component={IconButton} type="submit" sx={{ p: '10px' }} aria-label="search">
						<SearchIcon />
					</Grid>
				</Grid>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<Button color="inherit" onClick={ User.signOut }>Log Out</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Nav;
