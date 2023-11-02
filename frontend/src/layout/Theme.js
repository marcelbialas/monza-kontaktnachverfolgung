import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#0D0D0D',
		},
		primary: {
			main: '#d32f2f',
		},
	},
	typography: {
		h1: {
			fontSize: '3.052rem',
			fontFamily: 'Arvo',
		},
		h2: {
			fontSize: '1.953rem',
			fontFamily: 'Arvo',
		},
		h3: {
			fontSize: '1.553rem',
			fontFamily: 'Arvo',
		},
		h4: {
			fontSize: '1.25rem',
			fontFamily: 'Arvo',
		},
		subtitle1: {
			fontSize: '1.25rem',
			fontWeight: '700',
		},
		subtitle2: {
			fontSize: '1rem',
			fontFamily: 'Arvo',
		},
		body1: {
			fontSize: '1.07rem',
			fontFamily: 'Lato',
			fontWeight: '400',
		},
		subheading: {
			fontSize: '1.25rem',
			fontFamily: 'Arvo',
		},
	},
});
