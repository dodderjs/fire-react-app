import { createTheme } from "@mui/material";


const theme = createTheme({
	palette: {
		mode: 'dark'
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 342,
			md: 600,
			lg: 900,
			xl: 1200,
		}
	},
	components: {
		// Name of the component
		MuiCard: {
			styleOverrides: {
				// Name of the slot
				root: {
					minWidth: '160px',
					minHeight: '240px',
					backgroundColor: 'transparent',
					color: '#fff',
					borderRadius: '.5rem',
					boxShadow: 'none',
					position: 'relative',
					maxWidth: 'none',
					overflow: 'hidden',
					'&:after': {
						content: '""',
						display: 'block',
						position: 'absolute',
						width: '100%',
						height: '64%',
						bottom: 0,
						zIndex: 1,
						background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
					}
				}
			},
		},
		MuiCardContent: {
			styleOverrides: {
				// Name of the slot
				root: {
				}
			}
		}
	},
});
export default theme;
