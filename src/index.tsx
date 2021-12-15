import {StrictMode} from 'react';
import { render } from 'react-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import './index.css';
import AuthProvider from './providers/auth.provider';

render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthProvider>
				<App />
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>,
  document.getElementById('root')
);

