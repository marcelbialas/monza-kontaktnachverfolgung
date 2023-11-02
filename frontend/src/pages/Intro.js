import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

import axios from 'axios';

import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { useTranslation } from 'react-i18next';
import i18n from './../i18n';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	containerLeft: {
		background:
			'linear-gradient(180deg, rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url(https://monza.de/wp-content/uploads/2017/03/strecke-1-1.jpg) no-repeat',
		backgroundSize: 'cover',
		backgroundColor: '#260104',
		height: '100vh',
		[theme.breakpoints.between('xs', 'sm')]: {
			display: 'none',
		},
	},
	containerRight: {
		marginTop: '20vH',
	},
	iconContainer: {
		paddingTop: '15vh',
	},
	textContainer: {
		padding: '25px 50px 50px 50px',
	},
	form: {
		width: '100%',
	},
	input: {
		width: '100%',
		marginBottom: '30px',
	},
	touchButton: {
		width: '100%',
		height: '63px',
		borderRadius: '0px',
		fontSize: '1.25rem',
		fontWeight: '400',
		margin: '25px 0',
		textTransform: 'none',
		fontFamily: 'Arvo',
		textDecoration: 'none',
	},
	touchButtonGroup: {
		width: '100%',
		height: '63px',
		borderRadius: '0px',
		fontWeight: '700',
		margin: '0 0 25px 0 ',
	},
	touchButtonGroupButton: {
		width: '100%',
		fontWeight: '700',
		fontSize: '1rem',
		textTransform: 'none',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Intro = (props) => {
	const [user, setUser] = React.useState({}); // user data
	const { register, handleSubmit, errors } = useForm(); // form validation
	const [apiResponse, setApiResponse] = React.useState(false); // apiResponse (true,false)
	const [loading, setLoading] = React.useState(false); // loading state
	const [error, setError] = React.useState();

	const classes = useStyles();
	const { t } = useTranslation();

	/* OnSubmit -> send data */
	const onSubmit = (e) => {
		if (apiResponse === false) {
			searchUser()
				.then(() => {
					props.getUserSkill(user);
					if (apiResponse === false) {
						console.log(apiResponse);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			props.history.go(0);
		}
	};

	React.useEffect(() => {
		return setUser({ ...user, email: props.user.email });
	}, [props.user.email]);

	/* searchUser -> API Call */
	const searchUser = async () => {
		setLoading(true); // when function is called, setLoading true
		await axios
			.post('https://api.rhythmspot.de/getCustomer', {
				user: user.email,
				api_key: '4796b0c9-c56d-4882-a598-54b79666e716',
			})
			.then(function (response) {
				setLoading(false); // response from backend is there, stop loading
				setApiResponse(true); // api response is true
			})
			.catch(function (error) {
				setLoading(false); // error response, set loading false
				setApiResponse(false); // api response is false
				setError('Beim abrufen der Daten ist ein Fehler aufgetreten. Bitte versuche es später erneut. (404)');
				props.history.push('/rules'); // when error redirect to "/"
			});
	};

	return (
		<div className={classes.root}>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='primary' />
			</Backdrop>
			<Grid container>
				<Grid item md={6} className={classes.containerLeft}>
					<div className={classes.iconContainer}>
						<svg
							style={{ display: 'block', margin: '0 auto' }}
							width='105'
							height='105'
							viewBox='0 0 105 105'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M60.0367 18.7265V17.5939C64.5668 17.2322 68.1431 13.4327 68.1431 8.81107C68.1431 6.45719 67.226 4.24409 65.5611 2.57942C63.8979 0.916152 61.6845 0 59.3293 0H45.671C40.8113 0 36.8574 3.95271 36.8574 8.81131C36.8574 11.165 37.7745 13.3781 39.4396 15.043C40.9366 16.54 42.8773 17.4298 44.9641 17.5946V18.7265C40.7214 19.4713 36.6891 20.8338 32.9626 22.7172L29.901 18.6319C27.74 15.7481 23.6351 15.1599 20.751 17.32C19.3534 18.3669 18.447 19.8955 18.1991 21.6241C17.9511 23.3525 18.3912 25.0742 19.4384 26.472L22.3073 30.3014C14.1292 38.2092 9.03547 49.288 9.03547 61.5353C9.03547 85.5017 28.5336 105 52.4999 105C76.4665 105 95.9646 85.5017 95.9646 61.5353C95.9646 40.1388 80.4234 22.3056 60.0367 18.7265ZM42.7414 11.7412C41.9583 10.9581 41.5269 9.91751 41.5269 8.81131C41.5269 6.52746 43.3858 4.66948 45.671 4.66948H59.3293C60.4371 4.66948 61.4775 5.09977 62.2594 5.88144C63.0424 6.66451 63.4734 7.70487 63.4734 8.81131C63.4734 10.8549 61.985 12.5534 60.0365 12.8906V10.3873C60.0365 9.09778 58.991 8.05252 57.7017 8.05252H47.2986C46.0091 8.05252 44.9638 9.09778 44.9638 10.3873V12.8917C44.1271 12.7484 43.3547 12.3545 42.7414 11.7412ZM49.6336 12.722H55.3672V18.168C54.4191 18.1059 53.4635 18.0709 52.4999 18.0709C51.5366 18.0709 50.5815 18.1057 49.6336 18.1678V12.722ZM23.1751 23.6722C22.876 23.2729 22.7502 22.781 22.8212 22.287C22.8919 21.7932 23.1508 21.3566 23.5503 21.0572C24.3742 20.4402 25.547 20.6083 26.1645 21.432L28.8854 25.0625C27.839 25.7424 26.8234 26.4657 25.8416 27.2305L23.1751 23.6722ZM52.4999 100.331C31.1083 100.331 13.7049 82.9271 13.7049 61.5356C13.7049 40.144 31.1083 22.7404 52.4999 22.7404C73.8917 22.7404 91.2951 40.1437 91.2951 61.5353C91.2951 82.9269 73.8917 100.331 52.4999 100.331Z'
								fill='#FEFEFE'
							/>
							<path
								d='M52.4999 27.3765C33.6647 27.3765 18.3411 42.7001 18.3411 61.5353C18.3411 80.3706 33.6647 95.6942 52.4999 95.6942C71.3352 95.6942 86.6588 80.3706 86.6588 61.5353C86.6588 42.7001 71.3352 27.3765 52.4999 27.3765ZM52.4999 91.0247C36.2394 91.0247 23.0105 77.7959 23.0105 61.5353C23.0105 45.2748 36.2394 32.0459 52.4999 32.0459C68.7605 32.0459 81.9893 45.2748 81.9893 61.5353C81.9893 77.7959 68.7605 91.0247 52.4999 91.0247Z'
								fill='#FEFEFE'
							/>
							<path
								d='M54.8349 53.2886V38.5209C54.8349 37.2314 53.7894 36.1862 52.5001 36.1862C51.2107 36.1862 50.1654 37.2314 50.1654 38.5209V53.2884C46.5699 54.3077 43.9272 57.6177 43.9272 61.5354C43.9272 66.2623 47.773 70.1081 52.4999 70.1081C57.227 70.1081 61.0726 66.2623 61.0726 61.5354C61.0726 57.6179 58.4304 54.3082 54.8349 53.2886ZM52.4999 65.4386C50.3477 65.4386 48.5967 63.6875 48.5967 61.5354C48.5967 59.3832 50.3477 57.6321 52.4999 57.6321C54.6521 57.6321 56.4031 59.3832 56.4031 61.5354C56.4031 63.6875 54.6521 65.4386 52.4999 65.4386Z'
								fill='#FEFEFE'
							/>
						</svg>
					</div>
					<div className={classes.textContainer}>
						<Typography variant='h1' style={{ marginBottom: '15px' }}>
							{t('lass_uns_starten')}
						</Typography>
						<Typography variant='body1'>{t('lass_uns_starten_subtext')}</Typography>
					</div>
				</Grid>
				<Grid item md={6} sm={12} className={classes.containerRight}>
					<div className={classes.textContainer}>
						<form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
							{apiResponse ? (
								<>
									<Snackbar autoHideDuration={6000} open={apiResponse}>
										<Alert severity={error ? 'error' : 'success'}>
											{error ? error : 'Willkommen zurück, drücke auf Check-in, um dich anzumelden.'}
										</Alert>
									</Snackbar>
									<Snackbar autoHideDuration={6000} open={error}>
										<Alert severity='error'>{error}</Alert>
									</Snackbar>
									<Typography variant='h2' type='email' style={{ marginBottom: '15px' }}>
										{t('checkin_heading')}
									</Typography>
									<Typography variant='body1'>
										{t('checkin_subtext')}
										<br />
										<br />
										<Typography variant='body2'>{t('checkin_disclaimer')}</Typography>
									</Typography>
								</>
							) : (
								<>
									<Button size='large' onClick={() => i18n.changeLanguage('de')} style={{ marginBottom: '15px' }}>
										🇩🇪
									</Button>
									<Button size='large' onClick={() => i18n.changeLanguage('en')} style={{ marginBottom: '15px' }}>
										🇬🇧
									</Button>
									<Typography variant='h2' type='email' style={{ marginBottom: '15px' }}>
										{t('email')}
									</Typography>
									<TextField
										name='email'
										inputRef={register({ required: true, pattern: /^\S+@\S+\.\S+$/ })}
										{...(errors.email ? { error: true } : {})}
										helperText={errors.email && 'Bitte gebe eine gültige E-Mail Adresse an '}
										defaultValue={user.email || props.user.email}
										variant='outlined'
										required
										fullWidth
										id='email'
										label={t('email_placeholder')}
										autoComplete='email'
										className={classes.input}
										onChange={(e) => setUser({ ...user, email: e.target.value })}
									/>
									<Typography variant='h2' style={{ marginBottom: '15px' }}>
										{t('wiederkehrender_kunde')}
									</Typography>
									<ButtonGroup
										variant='outlined'
										color='primary'
										aria-label='outlined primary button group'
										className={classes.touchButtonGroup}
									>
										<Button
											variant={user && user.returningVisitor === true ? 'contained' : ''}
											disabled={user.email === undefined}
											onClick={() => setUser({ ...user, returningVisitor: true })}
											className={classes.touchButtonGroupButton}
										>
											<MoodIcon style={{ marginRight: '7.5px' }} /> {t('ja')}
										</Button>
										<Button
											variant={user && user.returningVisitor === false ? 'contained' : ''}
											disabled={user.email === undefined}
											onClick={() => setUser({ ...user, returningVisitor: false })}
											className={classes.touchButtonGroupButton}
										>
											<MoodBadIcon style={{ marginRight: '7.5px' }} /> {t('nein')}
										</Button>
									</ButtonGroup>
								</>
							)}
							<Button type='submit' color='primary' variant='contained' className={classes.touchButton}>
								{apiResponse ? 'Check-in' : t('los_gehts')}
							</Button>
							{apiResponse && (
								<Button
									color='inhertit'
									variant='outlined'
									style={{ marginTop: '-5px' }}
									className={classes.touchButton}
									onClick={() => props.history.go(0)}
								>
									{t('zurueck')}
								</Button>
							)}
						</form>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Intro;
