//import logo from './logo.svg';
import { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {AuthContext, AuthProvider} from './providers/auth.provider';
import {storeService} from './services/store.service';

import { Movie } from './movie';
import Login from './pages/Login';
import Home from './pages/Home';
import { RequireAuth } from './components/RequireAuth';
import MoviesProvider from './providers/movies.provider';

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

	render() {
		let { user, signIn, signOut } = this.context;

		//return user ? this.renderApp() : this.renderLogin();
		return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={
					<RequireAuth user={user}>
						<MoviesProvider><Home user={user} signOut={signOut}/></MoviesProvider>
					</RequireAuth>
					} />
				<Route path="login" element={<Login user={user} signIn={signIn} />}/>
			</Routes>
		</BrowserRouter>
		);
	}
}

export default App;
