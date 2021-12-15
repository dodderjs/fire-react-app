import { Grid } from "@mui/material";
import Nav from "../components/Nav.component";
import MovieList from "../components/MovieList/MovieList.component";
import { useState } from "react";
import storeService from "../services/store.service";
import { Movie } from "../movie";

const HomePage = ()=> {
	const [filterText, setFilterText] = useState('');
	const [movies, setMovies] = useState([]);


	function handleFilterTextChange(value:string) {

	}
	return (
		<Grid container className="App">
			<Nav
				search={filterText}
				onSearchChange={handleFilterTextChange}
			  />
			<MovieList
				movies={movies}
			/>
		</Grid>);
  }
export default HomePage;
