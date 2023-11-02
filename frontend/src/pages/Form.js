import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import StepNavigation from './../layout/StepNavigation';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

const Form = (props) => {
	const [userData, setUserData] = React.useState({});
	const [addChild, setAddChild] = React.useState(0);
	const { register, handleSubmit, errors } = useForm();

	const useStyles = makeStyles((theme) => ({
		containerLeft: {
			background: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(https://monza.de/wp-content/uploads/2017/03/strecke-1-1.jpg) no-repeat`,
			backgroundPosition: '-190px -0px',
			height: '100vH',
			width: '100%',
			backgroundSize: 'cover',
			position: 'sticky',
			top: 0,
			bottom: 0,
			zIndex: 5,
		},
		webCamContainer: {
			width: '100%',
			height: '100vh',
			objectFit: 'cover',
		},
		captureButtonContainer: {
			position: 'absolute',
			bottom: '5%',
			left: '1.5%',
			width: '39vw',
			height: '60px',
			margin: '0 10px 0 10px',
			borderRadius: '0px',
			fontSize: '1.25rem',
			fontWeight: '700',
			textTransform: 'none',
			fontFamily: 'Lato',
			textDecoration: 'none',
		},
		captureButton: {
			margin: '0 10px 0 10px',
			borderRadius: '0px',
			fontSize: '1rem',
			fontWeight: '700',
			textTransform: 'none',
			fontFamily: 'Lato',
			textDecoration: 'none',
		},
		textContainerRight: {
			padding: '50px 50px 50px 50px',
			height: 'auto',
			overflowY: 'scroll',
		},
		form: {
			width: '100%',
		},
		input: {
			width: '100%',
			marginBottom: '30px',
		},
	}));

	const classes = useStyles();
	const { t } = useTranslation();

	const onSubmit = (e) => {
		setUserData({ ...userData });
		props.getUserData({ ...userData });
		props.history.push('/finish');
	};

	return (
		<Grid container>
			<Grid item md={12} sm={12}>
				<div className={classes.textContainerRight}>
					<Typography variant='h1' style={{ marginBottom: '15px' }}>
						{t('persoenliche_daten')}
					</Typography>
					<Typography variant='body1'>{t('persoenliche_daten_subheading')}</Typography>
					<form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
						<Typography variant='h3' style={{ marginBottom: '15px', marginTop: '50px' }}>
							{t('vorname')}*
						</Typography>
						<TextField
							name='firstName'
							inputRef={register({ required: true, maxLength: 20, pattern: /^[A-Za-zÄäÜüÖöß -]+$/i })}
							{...(errors.firstName ? { error: true } : {})}
							helperText={errors.firstName && 'Bitte gebe eine Vornamen an'}
							defaultValue={!props.user.formData ? userData.firstName : props.user.formData.firstName}
							variant='outlined'
							required
							fullWidth
							id='firstName'
							label={t('vorname_label')}
							autoComplete='name'
							className={classes.input}
							onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
						/>
						<Typography variant='h3' style={{ marginBottom: '15px' }}>
							{t('nachname')}*
						</Typography>
						<TextField
							id='lastName'
							name='lastName'
							inputRef={register({ required: true, maxLength: 20, pattern: /^[A-Za-zÄäÜüÖöß -]+$/i })}
							{...(errors.lastName ? { error: true } : {})}
							helperText={errors.lastName && 'Bitte gebe eine Nachnamen an'}
							defaultValue={!props.user.formData ? userData.lastName : props.user.formData.lastName}
							label={t('nachname_label')}
							variant='outlined'
							className={classes.input}
							onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
						/>
						<Typography variant='h3' style={{ marginBottom: '15px' }}>
							{t('geburtsdatum')}*:
						</Typography>
						<TextField
							id='date'
							name='date'
							inputRef={register({ required: true, pattern: /[0-9][.,-]/ })}
							{...(errors.date ? { error: true } : {})}
							helperText={errors.date && 'Bitte wähle ein gültiges Geburtsdatum aus'}
							defaultValue={!props.user.formData ? userData.dob : props.user.formData.dob}
							//type='date'
							placeholder='DD.MM.YYYY'
							className={classes.input}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
						/>
						<Typography variant='h3' style={{ marginBottom: '15px' }}>
							{t('strasse_nr')}*
						</Typography>
						<TextField
							id='adress'
							name='adress'
							inputRef={register({ required: true })}
							{...(errors.adress ? { error: true } : {})}
							helperText={errors.date && 'Bitte gib eine gültige Adresse an'}
							defaultValue={!props.user.formData ? userData.adress : props.user.formData.adress}
							label={t('strasse_nr')}
							variant='outlined'
							className={classes.input}
							onChange={(e) => setUserData({ ...userData, adress: e.target.value })}
						/>
						<Typography variant='h3' style={{ marginBottom: '15px' }}>
							{t('plz')}*
						</Typography>
						<TextField
							id='plz'
							name='plz'
							inputRef={register({ required: true, pattern: /[0-9]/ })}
							{...(errors.plz ? { error: true } : {})}
							helperText={errors.plz && 'Bitte gib eine gültige Postleitzahl an'}
							defaultValue={!props.user.formData ? userData.plz : props.user.formData.plz}
							type='number'
							label={t('postcode')}
							variant='outlined'
							className={classes.input}
							onChange={(e) => setUserData({ ...userData, plz: e.target.value })}
							style={{ width: '50%', paddingRight: '10px' }}
						/>

						<TextField
							id='city'
							name='city'
							inputRef={register({ required: true, pattern: /[a-zA-Z]/ })}
							{...(errors.city ? { error: true } : {})}
							helperText={errors.city && 'Bitte gib eine gültige Stadt an'}
							defaultValue={!props.user.formData ? userData.city : props.user.formData.city}
							label={t('ort')}
							variant='outlined'
							className={classes.input}
							onChange={(e) => setUserData({ ...userData, city: e.target.value })}
							style={{ width: '50%' }}
						/>
						<Typography variant='h3' style={{ marginBottom: '15px' }}>
							{t('telefonnummer')}*
						</Typography>
						<TextField
							id='tel'
							name='tel'
							inputRef={register({ required: true, pattern: /[0-9]/ })}
							{...(errors.tel ? { error: true } : {})}
							helperText={errors.tel && 'Bitte gib eine gültige Telefonnummer an'}
							defaultValue={!props.user.formData ? userData.tel : props.user.formData.tel}
							type='number'
							label={t('telefonnummer')}
							variant='outlined'
							className={classes.input}
							onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
						/>
						{addChild <= 4 &&
							[...Array(addChild)].map((e, i) => (
								<div className={classes.childContainer} key={i}>
									<Typography variant='h3' style={{ marginBottom: '15px', marginTop: '15px' }}>
										{t('kind')} {i + 1}
									</Typography>
									<Typography variant='h4' style={{ marginBottom: '15px' }}>
										{t('vorname_label')}:*
									</Typography>
									<TextField
										name={`firstNameChild${i}`}
										id={`firstNameChild${i}`}
										type='text'
										label={t('vorname_label')}
										variant='outlined'
										className={classes.input}
										onChange={(e) => setUserData({ ...userData, [`firstNameChild${i}`]: e.target.value })}
									/>
									<Typography variant='h4' style={{ marginBottom: '15px' }}>
										{t('geburtsdatum')}:*
									</Typography>
									<TextField
										id={`date${i}`}
										name={`date${i}`}
										className={classes.input}
										placeholder='DD.MM.YYYY'
										InputLabelProps={{
											shrink: true,
										}}
										onChange={(e) => setUserData({ ...userData, [`dobChild${i}`]: e.target.value })}
									/>
								</div>
							))}

						{
							<ButtonGroup
								variant='outlined'
								color='secondary'
								aria-label='outlined primary button group'
								style={{ marginBottom: '17.5px' }}
							>
								<Button
									variant='outlined'
									color='primary'
									onClick={() => {
										setAddChild(addChild + 1);
										setUserData({ ...userData, childs: addChild });
									}}
									disabled={addChild >= 4}
								>
									<AddIcon />
									{t('kind_hinzufuegen')}
								</Button>
								{addChild > 0 && (
									<Button variant='outlined' color='primary' onClick={() => setAddChild(addChild - 1)}>
										<RemoveIcon />
										{t('kind_entfernen')}
									</Button>
								)}
							</ButtonGroup>
						}
						<br />
						<FormControlLabel
							control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite color='primary' />} name='checkedH' />}
							label={t('marketing')}
							onChange={(e) => setUserData({ ...userData, marketing: e.target.checked })}
						/>
					</form>
				</div>
				<StepNavigation
					step={2}
					prevLink='/rules'
					onClick={handleSubmit(onSubmit)}
					disabled={Object.keys(errors).length === 0 ? false : true}
				/>
			</Grid>
		</Grid>
	);
};

export default Form;
