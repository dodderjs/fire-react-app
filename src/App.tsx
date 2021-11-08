//import logo from './logo.svg';
import { Component } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import MovieList from './components/MovieList.component';

// <img src={logo} className="App-logo" alt="logo" />

interface AppState {
	pageSize: number
}
class App extends Component<any, AppState>  {

	constructor(props:any) {
		super(props);
		const w = window.innerWidth / 160;
		const pageCount = Math.floor(w) *  Math.ceil(window.innerHeight / (240* (window.innerWidth / (160*Math.floor(w)))));
		this.state = {
			pageSize: pageCount < 10 ? 10 : pageCount
		}
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div className="App">
					<MovieList pageSize={this.state.pageSize}/>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;
