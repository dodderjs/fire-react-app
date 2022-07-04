import { Box, Button, Grid } from "@mui/material";
import Nav from "../components/Nav.component";
import MovieList from "../components/MovieList/MovieList.component";
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../providers/movies.provider";
import { WithLoading } from "../components/WithLoading";
import { AuthContext } from "../providers/auth.provider";


const HomePage = (props:any) => {
	let auth = useContext(AuthContext);
	const {filter, setFilter, movies, loading, nextPage, pageSize} = useContext(MoviesContext);

	function handleFilterTextChange(value:string) {
		setFilter(value);
	}

	return (<Grid container className="App">
				<Nav
					search={filter}
					onSearchChange={handleFilterTextChange}
					signOut={props.signOut}
				/>
				<MovieList
					loading={loading}
					movies={movies}
					pageSize={pageSize}
					nextPage={nextPage}
				/>
			</Grid>);
}

export default WithLoading(HomePage);
