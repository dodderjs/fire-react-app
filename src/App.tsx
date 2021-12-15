//import logo from './logo.svg';
import { Component } from 'react';
import MovieList from './components/MovieList/MovieList.component';
import AuthContext from './contexts/auth.context';
import Nav from './components/Nav.component';
import { User } from 'firebase/auth';
import { CircularProgress, Grid } from '@mui/material';
import { Movie } from './movie';
import storeService from './services/store.service';
import {BrowserRouter as Router,Route} from'react-router-dom';
import Login from './components/Login.component';

// <img src={logo} className="App-logo" alt="logo" />

interface AppState {
	pageSize: number,
	filterText: string,
	movies: Movie[],
	loading: boolean,
	error: Error|null
}
class App extends Component<any, AppState>  {
	static contextType = AuthContext;

	constructor(props:any) {
		super(props);

		const w = window.innerWidth / 160;
		const pageCount = Math.floor(w) *  Math.ceil(window.innerHeight / (240* (window.innerWidth / (160*Math.floor(w)))));

		this.state = {
			pageSize: pageCount < 10 ? 10 : pageCount,
			filterText: '',
			movies: [],
			loading: false,
			error: null
		}
		storeService.pageSize = this.state.pageSize;
	}
	componentDidMount() {
		this.getMovies();
	}

	getMovies(filter = this.state.filterText) {
		this.setState({
			loading: true
		});
		storeService.getOnlineMovies(filter, 1)
			.then((data: Movie[]) => this.setState({ movies:  data, filterText: filter, loading: false }))
			.catch((e:Error) => this.setState({ loading: false, error: e }));
	}

	handleFilterTextChange(value:string) {
		this.getMovies(value);
	}

	renderApp() {
		return (
			<Grid container className="App">
				<Nav
					search={this.state.filterText}
          			onSearchChange={this.handleFilterTextChange.bind(this)}
		  		/>
				<MovieList
					movies={this.state.movies}
					loading={this.state.loading}
					pageSize={this.state.pageSize}
				/>
			</Grid>);
	}

	renderLogin() {
		let {loading} = this.context;
		return (<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh' }}
		  >

			<Grid item xs={3}>
				{loading ? this.renderLoading() : <Login />}
			</Grid>
		  </Grid> )
	}
	renderLoading() {
		return (<CircularProgress color="secondary" />)
	}

	render() {
		let { user } = this.context;

		return user ? this.renderApp() : this.renderLogin();
		/*return (
			<Router>
				<Route element={<Layout />}>
				<Route path="/" element={<PublicPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/protected"
					element={
					<RequireAuth>
						<ProtectedPage />
					</RequireAuth>
					}
				/>
				</Route>
		  </Router>
		);*/
	}
}

export default App;
