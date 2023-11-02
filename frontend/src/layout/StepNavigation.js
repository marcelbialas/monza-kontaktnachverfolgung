import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	navigationBar: {
		position: 'sticky',
		top: 0,
		bottom: 0,
		height: ' 60px',
		padding: '1px 0',
		width: '100%',
		zIndex: 6,
	},
}));
const StepNavigation = (props) => {
	const classes = useStyles();
	const { t } = useTranslation();
	const activeStep = props.step;
	return (
		<Box className={classes.navigationBar}>
			<MobileStepper
				variant='progress'
				LinearProgressProps={{ style: { backgroundColor: 'green' } }}
				style={{ backgroundColor: '#202020' }}
				steps={5}
				activeStep={activeStep}
				position='static'
				nextButton={
					props.disabled ? (
						<Button size='large' disabled={props.disabled} onClick={props.onClick}>
							{activeStep === 3 ? (
								<>
									<DoneAllIcon style={{ marginRight: '5px' }} />
									{t('fertig')}
								</>
							) : (
								<>
									<Typography style={{ fontWeight: 'bold' }}>
										{t('weiter')} {props.nextLabel && props.nextLabel !== 0 ? `(${props.nextLabel})` : ''}
									</Typography>
									<KeyboardArrowRight />
								</>
							)}
						</Button>
					) : (
						<Link to={props.nextLink}>
							<Button size='large' disabled={props.disabled} onClick={props.onClick}>
								{activeStep === 3 ? (
									<>
										<DoneAllIcon style={{ marginRight: '5px' }} />
										{t('fertig')}
									</>
								) : (
									<>
										<Typography style={{ fontWeight: 'bold' }}>
											{t('weiter')} {props.nextLabel && props.nextLabel !== 0 ? `(${props.nextLabel})` : ''}
										</Typography>
										<KeyboardArrowRight />
									</>
								)}
							</Button>
						</Link>
					)
				}
				backButton={
					<Link Link to={props.prevLink}>
						<Button size='large' disabled={props.disabledPrev}>
							<KeyboardArrowLeft />
							<Typography style={{ fontWeight: 'bold' }}>{props.prevLabel ? props.prevLabel : t('zurueck')}</Typography>
						</Button>
					</Link>
				}
			/>
		</Box>
	);
};

export default StepNavigation;
