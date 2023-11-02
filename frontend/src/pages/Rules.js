import React from 'react';
import Grid from '@material-ui/core/Grid';
import FlagIcon from '@material-ui/icons/Flag';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StepNavigation from './../layout/StepNavigation';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Vid from './../images/insta.mp4';

const useStyles = makeStyles((theme) => ({
	containerLeft: {
		height: '100vh',
		position: 'sticky',
		top: 0,
		bottom: 0,
		zIndex: 5,
		'&:before': {
			content: '""',
			display: 'block',
			height: '100vh',
			position: 'absolute',
			top: '0',
			left: '0',
			opacity: '1',
			width: '50vw',
			zIndex: '2',
			background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.8))',
			transition: 'opacity 0.25s',
			marginTop: '0px',
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			maxHeight: '100vh',
		},
		[theme.breakpoints.between('xs', 'sm')]: {
			display: 'none',
		},
	},
	HeroVideo: {
		width: '100%',
		height: '100vH',
		objectFit: 'cover',
		position: 'relative',
	},
	textContainer: {
		top: 0,
		position: 'absolute',
		left: 0,
		zIndex: 3,
		maxWidth: '50vw',
		padding: '50px',
		transform: 'translate(0%, 25vh)',
	},
	textContainerRight: {
		padding: '50px 50px 50px 50px',
	},
	flag: {
		fontSize: '40px',
	},
	blueFlag: {
		color: 'blue',
	},
	yellowFlag: {
		color: 'yellow',
	},
	redFlag: {
		color: 'red',
	},
	blackFlag: {
		color: '#505050',
	},
}));

const Rules = (props) => {
	const classes = useStyles();
	const [counter, setCounter] = React.useState(5);
	const [disabled, setDisabled] = React.useState(true);

	const { t } = useTranslation();

	React.useEffect(() => {
		counter > 0 &&
			setTimeout(() => {
				setCounter(counter - 1);
				setTimeout(() => {
					setDisabled(false);
				}, 4000);
			}, 1000);
	}, [counter, disabled]);
	return (
		<div>
			<Grid container>
				<Grid item md={6} sm={12} className={classes.containerLeft}>
					<video autoPlay='autoplay' loop='loop' muted className={classes.HeroVideo}>
						<source src={Vid} type='video/mp4' />
					</video>

					<div className={classes.textContainer}>
						<Typography variant='h1' style={{ marginBottom: '15px' }}>
							Safety first{' '}
						</Typography>
						<Typography variant='body1'>{t('regeln_subheading')}</Typography>
					</div>
				</Grid>
				<Grid item md={6} sm={12} className={classes.containerRight}>
					<div className={classes.textContainerRight}>
						<Typography variant='h1'>{t('flags_lights')}</Typography>
						<Box mt={5}>
							<FlagIcon fontSize='large' className={`${classes.flag} ${classes.blueFlag}`} />
						</Box>
						<Box mt={2}>
							<Typography variant='subtitle1'>{t('blaue_flagge')}</Typography>
							<Typography variant='body1'> {t('blaue_flagge_subtext')}</Typography>
						</Box>
						<Box mt={5}>
							<FlagIcon fontSize='large' className={`${classes.flag} ${classes.yellowFlag}`} />
							<WbIncandescentIcon fontSize='large' className={`${classes.flag} ${classes.yellowFlag}`} />
						</Box>
						<Box mt={2}>
							<Typography variant='subtitle1'>{t('gelbe_flagge')}</Typography>
							<Typography variant='body1'>{t('gelbe_flagge_subtext')}</Typography>
						</Box>
						<Box mt={5}>
							<FlagIcon fontSize='large' className={`${classes.flag} ${classes.redFlag}`} />
							<WbIncandescentIcon fontSize='large' className={`${classes.flag} ${classes.redFlag}`} />
						</Box>
						<Box mt={2}>
							<Typography variant='subtitle1'>{t('rote_flagge')} </Typography>
							<Typography variant='body1'>{t('rote_flagge_subtext')}</Typography>
						</Box>
						<Box mt={5}>
							<FlagIcon fontSize='large' className={`${classes.flag} ${classes.blackFlag}`} />
						</Box>
						<Box mt={2}>
							<Typography variant='subtitle1'>{t('schwarze_flagge')}</Typography>
							<Typography variant='body1'>{t('schwarze_flagge_subtext')}</Typography>
						</Box>
						<Box></Box>
					</div>

					<StepNavigation step={1} nextLink='/personalInfo' prevLink='/' disabled={disabled} nextLabel={counter} />
				</Grid>
			</Grid>
		</div>
	);
};

export default Rules;
