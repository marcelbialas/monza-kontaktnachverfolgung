import React from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import SignaturePad from 'react-signature-pad-wrapper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';

import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';

import StepNavigation from './../layout/StepNavigation';

import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	container: {
		padding: '50px 25px 25px 25px',
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	doneContainer: {
		backgroundColor: '#4BB543',
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		margin: '0 auto',
		marginBottom: '25px',
	},
	finishPage: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		width: '100%',
	},
	doneIcon: {
		fontSize: '80px',
		position: 'relative',
		top: '10%',
	},
	gridList: {
		width: 500,
		height: 450,
	},
	rulesContainer: {
		backgroundColor: '#202020',
		overflowY: 'scroll',
		height: '170px',
		padding: '0 25px',
		borderTop: '20px solid rgba(0,0,0,0)',
		borderBottom: '20px solid rgba(0,0,0,0)',
		marginBottom: '25px',
		width: '95%',
		margin: '0 auto',
	},
	sigCanvas: {
		width: '100%',
		height: '30vh',
	},
	rulesListItem: {
		padding: '5px',
	},
}));

const Finish = (props) => {
	const [finish, setFinish] = React.useState(false);
	const [error, setError] = React.useState({});
	const [signature, setSignature] = React.useState();
	const [loading, setLoading] = React.useState();
	let myRef = React.useRef(null);

	const { t } = useTranslation();

	const handleSubmit = () => {
		setLoading(true);
		saveCanvas();
		console.log(signature);
		if (!myRef.isEmpty()) {
			axios
				.post('https://api.rhythmspot.de/addCustomer', {
					user: props.user,
					signature: signature,
					api_key: '639e4f50-277e-41e8-bdef-68e58dab2e75',
				})
				.then(function (response) {
					console.log(response);
					if (response.status === 200) {
						setLoading(false);
						setFinish(true);
					}
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
					setError({ serverError: 'Es ist ein Fehler aufgetreten, bitte melde dich beim Bistropersonal' });
					setTimeout(() => {
						return window.location.replace('https://monza.rhythmspot.de');
					}, 3000);
				});
		} else {
			setLoading(false);
			setError({ signatureError: 'Bitte unterschreiben' });
			console.log(error);
		}
	};
	const saveCanvas = () => {
		var canvas = document.getElementById('sigCanvas');
		var image = canvas.toBlob(
			(blob) => {
				var blobUrl = URL.createObjectURL(blob);
				setSignature(blobUrl);
			},
			'image/png',
			0.95
		);
		console.log(image);
		console.log('image up');
		console.log(myRef.isEmpty());
	};

	const classes = useStyles();
	return (
		<Grid container className={classes.root}>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='primary' />
			</Backdrop>
			<Grid item xs={12} sm={12} className={classes.container}>
				{finish === false ? (
					<>
						<Typography variant='h1' align='center'>
							{t('fast_fertig')}
							{props.user.formData !== undefined ? `, ${props.user.formData.firstName}` : ''}
						</Typography>
						<Typography variant='h2' align='center'>
							{t('fast_fertig_subheading')}
						</Typography>
						<Box mt={5} />
						<Paper className={classes.rulesContainer}>
							<div className={classes.rulesText}>
								<Typography variant='h3'>Kartbahn-Regeln</Typography>
								<ol>
									<Typography variant='subtitle1'>Allgemein:</Typography>
									<li>
										<Typography variant='body1'>
											Jeder Besucher erkennt die ausgehängten / folgenden Kartbahn-Regeln an.
										</Typography>
									</li>
									<li>
										<Typography variant='body1'>
											Vor Antritt der Fahrt verpflichtet sich der Benutzer, die Flaggenzeichen, Schaltung der Ampelanlage und
											die Bedeutung der Blinkleuchten genauestens zu studieren und auch während der Fahrt exakt zu beachten.
										</Typography>
									</li>
									<li>
										<Typography variant='body1'>
											Der Benutzer verpflichtet sich, den Anweisungen des Kartpersonals unverzüglich Folge zu leisten.
										</Typography>
									</li>
									<Box mt={1} />
									<Typography variant='subtitle1'>Teilnahme am Fahrbetrieb:</Typography>
									<Box mt={1} />
									<li>
										<Typography variant='body1'>
											Die Benutzung der Kartbahn ist nur mit Schutzhelm und eng anliegender Kleidung sowie festem Schuhwerk
											zulässig.
										</Typography>
									</li>
									<li>
										<Typography variant='body1'>
											Personen, die unter Alkohol- und/oder Drogeneinfluss stehen, dürfen die Karts nicht benutzen.
										</Typography>
									</li>
									<li>
										<Typography variant='body1'>
											Jeder Fahrer verpflichtet sich zur Rücksichtnahme auf andere Bahnbenutzer. Mutwilliges Auffahren und/oder
											Rammen bedeutet sofortiges Fahrverbot.
										</Typography>
									</li>
									<li>
										<Typography variant='body1'>
											Im gesamten Fahrbereich und in der Boxengasse besteht absolutes Rauchverbot. Rauchen ist nur in den dafür
											vorgesehenen Bereichen gestattet.
										</Typography>
									</li>
									<Box mt={1} />
									<Typography variant='subtitle1'>Haftungsausschluss:</Typography>
									<Box mt={1} />
									<li>
										<Typography variant='body1'>
											Der Benutzer haftet für grob fahrlässige und/ oder vorsätzlich verursachte Schäden, die er an den
											Fahrzeugen, Begrenzungen oder Fahrbahnen innerhalb der Halle und an fremden Eigentum verursacht, in
											uneingeschränkter Höhe. Ebenso für die von ihm verursachten Sach- und Personenschäden.
											Haftpflichtansprüche des Benutzers gegen den Betreiber der Bahn oder gegen die von diesem beauftragten
											Personen und das Bahnpersonal sind ausgeschlossen, es sei denn, es liegt Vorsatz oder grobe Fahrlässigkeit
											vor.
										</Typography>
									</li>
								</ol>
							</div>
						</Paper>
						<Box mt={5} />
						<Paper className={classes.rulesContainer}>
							<div className={classes.rulesText}>
								<Typography variant='h3'>Hinweise zum Datenschutz</Typography>
								<Typography variant='body1'>
									<>
										Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:
										<br />
										<br />
										Monza Indoor Kart GmbH
										<br />
										Dorstener Straße 360, 44653 Herne
										<br />
										02325988288
										<br />
										<Box mt={1} />
										<Typography variant='subtitle1'>Ihre Betroffenenrechte:</Typography>
										<Box mt={1} />
										Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte
										ausüben:
										<ul>
											<li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
											<li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
											<li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
											<li>
												Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht
												löschen dürfen (Art. 18 DSGVO),
											</li>
											<li>
												Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und Datenübertragbarkeit,
												sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben
												(Art. 20 DSGVO).
											</li>
										</ul>
										Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft
										widerrufen.
										<br />
										<br />
										Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige
										Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige
										Behörde.
										<br />
										<br />
										Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter:
										https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html.
										<br />
										<br />
										<Box mt={1} />
										<Typography variant='subtitle1'>Erfassung allgemeiner Informationen beim Besuch unserer Website</Typography>
										<Box mt={1} />
										<strong>Art und Zweck der Verarbeitung:</strong>
										<br />
										Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen
										übermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles)
										beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres
										Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
										<br />
										<br />
										<strong>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</strong>
										<ul>
											<li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
											<li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
											<li>Auswertung der Systemsicherheit und -stabilität sowie zur Optimierung unserer Website.</li>
											<li>
												Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Informationen dieser Art
												werden von uns ggfs. anonymisiert statistisch ausgewertet, um unseren Internetauftritt und die
												dahinterstehende Technik zu optimieren.
											</li>
										</ul>
										<strong>Rechtsgrundlage und berechtigtes Interesse:</strong>
										<br />
										<br />
										Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der
										Verbesserung der Stabilität und Funktionalität unserer Website.
										<br />
										<br />
										<strong>Empfänger:</strong>
										<br />
										<br />
										Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Webseite
										als Auftragsverarbeiter tätig werden.
										<br />
										<br />
										<strong>Speicherdauer:</strong>
										<br />
										<br />
										Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist für
										die Daten, die der Bereitstellung der Website dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung
										beendet ist.
										<br />
										<br />
										Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens 14 Tagen der Fall. Eine
										darüberhinausgehende Speicherung ist möglich. In diesem Fall werden die IP-Adressen der Nutzer anonymisiert,
										sodass eine Zuordnung des aufrufenden Clients nicht mehr möglich ist.
										<br />
										<br />
										<strong>Bereitstellung vorgeschrieben oder erforderlich:</strong>
										<br />
										<br />
										Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich
										vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht
										gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein. Aus diesem
										Grund ist ein Widerspruch ausgeschlossen.
										<br />
										<br />
										<strong>Technisch nicht notwendige Cookies</strong>
										<br />
										<br />
										Des Weiteren setzen wir Cookies ein, um das Angebot auf unserer Website besser auf die Interessen unserer
										Besucher abzustimmen oder auf Basis statistischer Auswertungen allgemein zu verbessern.
										<br />
										<br />
										Welche Anbieter Cookies setzen, entnehmen Sie bitte den unten aufgeführten Informationen zu den eingesetzten
										Darstellungs-, Tracking-, Remarketing- und Webanalyse-Technologien.
										<br />
										<strong>Rechtsgrundlage:</strong>
										<br />
										Rechtsgrundlage für diese Verarbeitungen ist jeweils Ihre Einwilligung, Art. 6 Abs. 1 lit. a DSGVO.
										<br />
										<strong>Empfänger:</strong>
										<br /> Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer
										Website als Auftragsverarbeiter tätig werden. Weitere Empfänger entnehmen Sie bitte den unten aufgeführten
										Informationen zu den eingesetzten Darstellungs-, Tracking-, Remarketing- und Webanalyse-Technologien.
										<br />
										<strong>Drittlandtransfer:</strong>
										<br /> Informationen hierzu entnehmen Sie bitte aus den Auflistungen der einzelnen Darstellungs-, Tracking-,
										Remarketing- und Webanalyse-Anbietern. Bereitstellung vorgeschrieben oder erforderlich: Natürlich können Sie
										unsere Website grundsätzlich auch ohne Cookies betrachten. Webbrowser sind regelmäßig so eingestellt, dass sie
										Cookies akzeptieren. Im Allgemeinen können Sie die Verwendung von Cookies jederzeit über die Einstellungen
										Ihres Browsers deaktivieren (siehe Widerruf der Einwilligung). Bitte beachten Sie, dass einzelne Funktionen
										unserer Website möglicherweise nicht funktionieren, wenn Sie die Verwendung von Cookies deaktiviert haben.
										<br />
										<br />
										<strong>Widerruf der Einwilligung:</strong>
										<br /> Sie können Ihre Einwilligung jederzeit über unser Cookie-Consent-Tool widerrufen.
										<br />
										<br />
										<strong>Profiling:</strong>
										<br /> Inwiefern wir das Verhalten von Websitebesuchern mit pseudonymisierten Nutzerprofilen analysieren,
										entnehmen Sie bitte den unten aufgeführten Informationen zu den eingesetzten Darstellungs-, Tracking-,
										Remarketing- und Webanalyse-Technologien.
										<br />
										<br />
										<Typography variant='subtitle1'>Registrierung auf unserer Website</Typography>
										<br />
										<strong>Art und Zweck der Verarbeitung:</strong>
										<br />
										<br />
										Für die Registrierung auf unserer Website benötigen wir einige personenbezogene Daten, die über eine
										Eingabemaske an uns übermittelt werden. Zum Zeitpunkt der Registrierung werden zusätzlich folgende Daten
										erhoben: Wir speichern zusätzlich zu Ihren Eingaben einen Zeitstempel der Registrierung und das Datum und die
										Uhrzeit Ihres Besuches. Diese Daten werden u.A zur Sicherstellung der Kontaktnachverfolgung gespeichert. Ihre
										Registrierung ist für das Bereithalten bestimmter Inhalte und Leistungen auf unserer Website erforderlich.{' '}
										<br />
										<br />
										<strong>Rechtsgrundlage:</strong>
										<br />
										<br />
										Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt auf Grundlage einer Einwilligung des
										Nutzers (Art. 6 Abs. 1 lit. a DSGVO).
										<strong>Empfänger:</strong>
										<br /> Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer
										Website als Auftragsverarbeiter tätig werden.
										<br />
										<br />
										<strong>Drittlandtransfer:</strong>
										<br />
										<br />
										Wir erheben, nutzen oder geben Ihre personenbezogenen Daten nur dann weiter, wenn dies im gesetzlichen Rahmen
										erlaubt ist oder Sie in die Datenerhebung einwilligen. Als personenbezogene Daten gelten sämtliche
										Informationen, welche dazu dienen, Ihre Person zu bestimmen und welche zu Ihnen zurückverfolgt werden können –
										also beispielsweise Ihr Name, Ihre E-Mail-Adresse und Ihre Telefonnummer.
										<br />
										<br />
										Wir speichern Ihre personenbezogenen Daten auf den Servern von Google (Google Inc., 1600 Amphitheatre Parkway
										Mountain View, CA 94043, USA).
										<br />
										<br />
										Im Rahmen der Vereinbarung zur Auftragsdatenvereinbarung, welche wir als Websitebetreiber mit der Google Inc.
										geschlossen haben, ist diese für die Bereitstellung und Speicherung der Daten zuständig.
										<br />
										<br />
										<strong>Welche Daten speichern wir?</strong> <br />
										<br />
										· Wir verarbeiten und speichern personenbezogene Daten wie Vorname, Nachname, E-Mail-Adresse, Wohnort, Straße,
										Postleitzahl, Telefonnummer und Geburtsdatum. Außerdem erheben wir Uhrzeit und Datum von deinem letzten
										Besuch, sowie der Registrierung.
										<br />
										<br />
										<strong>Wie verarbeiten wir Ihre personenbezogenen Daten?</strong> <br />
										<br />
										· Wir verarbeiten personenbezogene Daten nur nach ausdrücklicher Erlaubnis der betreffenden Nutzer und unter
										Einhaltung der geltenden Datenschutzbestimmungen.
										<br />
										<br />
										<strong>Warum speichern wir Ihre personenbezogenen Daten?</strong> <br />
										<br />· Die Verarbeitung der personenbezogenen Daten erfolgt aufgrund unseres berechtigten Interesses zur
										Erfüllung unserer vertraglich vereinbarten Leistungen und zur Optimierung unseres Online-Angebots, sowie zur
										Kontaktnachverfolgung.
										<br />
										<br />
										<Typography variant='subtitle1'>Folgende Datenschutzgarantien liegen vor:</Typography>
										<br />
										<strong>Speicherdauer:</strong>
										<br />
										Daten werden in diesem Zusammenhang nur verarbeitet, solange die entsprechende Einwilligung vorliegt. <br />
										<br />
										<strong>Bereitstellung vorgeschrieben oder erforderlich:</strong>
										<br />
										<br /> Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig, allein auf Basis Ihrer
										Einwilligung. Ohne die Bereitstellung Ihrer personenbezogenen Daten können wir Ihnen keinen Zugang auf unsere
										angebotenen Inhalte gewähren.
										<br />
										<br />
										<Typography variant='subtitle1'>Newsletter</Typography>
										<br />
										<strong>Art und Zweck der Verarbeitung:</strong>
										<br />
										<br />
										Für die Zustellung unseres Newsletters erheben wir personenbezogene Daten, die über eine Eingabemaske an uns
										übermittelt werden. Für eine wirksame Registrierung benötigen wir eine valide E-Mail-Adresse. Um zu
										überprüfen, dass eine Anmeldung tatsächlich durch den Inhaber einer E-Mail-Adresse erfolgt, setzen wir das
										„Double-Opt-in“-Verfahren ein. Hierzu protokollieren wir die Anmeldung zum Newsletter, den Versand einer
										Bestätigungsmail und den Eingang der hiermit angeforderten Antwort. Weitere Daten werden nicht erhoben.
										<br />
										<br />
										<strong>Rechtsgrundlage:</strong>
										<br />
										<br /> Auf Grundlage Ihrer ausdrücklich erteilten Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), übersenden wir
										Ihnen regelmäßig unseren Newsletter bzw. vergleichbare Informationen per E-Mail an Ihre angegebene
										E-Mail-Adresse. Die Einwilligung zur Speicherung Ihrer persönlichen Daten und ihrer Nutzung für den
										Newsletterversand können Sie jederzeit mit Wirkung für die Zukunft widerrufen. In jedem Newsletter findet sich
										dazu ein entsprechender Link. Außerdem können Sie sich jederzeit auch direkt auf dieser Website abmelden oder
										uns Ihren Widerruf über die am Ende dieser Datenschutzhinweise angegebene Kontaktmöglichkeit mitteilen.
										<br />
										<br />
										<strong>Empfänger:</strong>
										<br />
										<br />
										Empfänger der Daten sind ggf. Auftragsverarbeiter.
										<br />
										<br />
										<strong> Speicherdauer:</strong>
										<br />
										<br /> Die Daten werden in diesem Zusammenhang nur verarbeitet, solange die entsprechende Einwilligung
										vorliegt. Danach werden sie gelöscht. <br />
										<br />
										<strong>Bereitstellung vorgeschrieben oder erforderlich:</strong>
										Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig, allein auf Basis Ihrer Einwilligung. Ohne
										bestehende Einwilligung können wir Ihnen unseren Newsletter leider nicht zusenden.
										<br />
										<br />
										<strong>Widerruf der Einwilligung:</strong>
										<br />
										<br />
										Die Einwilligung zur Speicherung Ihrer persönlichen Daten und ihrer Nutzung für den Newsletterversand können
										Sie jederzeit mit Wirkung für die Zukunft widerrufen. Die Abmeldung kann über den in jeder E-Mail enthaltenen
										Link oder beim unten aufgeführten Datenschutzbeauftragten bzw. der für den Datenschutz zuständigen Person
										beantragt werden.
										<br />
										<br />
										<Typography variant='subtitle1'>Verwendung von Scriptbibliotheken (Google Webfonts)</Typography>
										<br />
										Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend darzustellen, verwenden wir auf dieser
										Website „Google Web Fonts“ der Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA;
										nachfolgend „Google“) zur Darstellung von Schriften. Weitere Informationen zu Google Web Fonts finden Sie
										unter https://developers.google.com/fonts/faq und in der Datenschutzerklärung von Google:
										https://www.google.com/policies/privacy/. SSL-Verschlüsselung Um die Sicherheit Ihrer Daten bei der
										Übertragung zu schützen, verwenden wir dem aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren
										(z. B. SSL) über HTTPS. Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO Einzelfallbezogenes
										Widerspruchsrecht Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
										gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO
										(Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch
										für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO. Legen Sie Widerspruch ein,
										werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende
										schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen,
										oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Empfänger
										eines Widerspruchs Monza Indoor Kart GmbH Dorstener Straße 360, 44653 Herne 02325/988288 Ansprechpartner:
										Oliver Crämer, Marcel Bialas Änderung unserer Datenschutzbestimmungen Wir behalten uns vor, diese
										Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um
										Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services.
										Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung. Fragen an den Datenschutzbeauftragten Wenn
										Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für
										den Datenschutz verantwortliche Person in unserer Organisation:
									</>
								</Typography>
							</div>
						</Paper>
						<Box mt={2} />
						<Typography variant='h2'> {t('unterschrift')} ⬇️</Typography>
						<Box mt={2} />
						<div className={classes.signature}>
							<SignaturePad
								ref={(ref) => (myRef = ref)}
								height={300}
								canvasProps={{ className: 'sigCanvas', id: 'sigCanvas' }}
								options={{ penColor: 'rgb(211, 47, 47)', backgroundColor: '#202020' }}
							/>
							<Box mt={2} />
							<Button variant='contained' onClick={() => myRef.clear()}>
								{t('neuer_versuch')}
							</Button>
							<Box mt={2} />
							<Typography variant='body1'>{t('unterschrift_disclaimer')}</Typography>
						</div>
						{error.signatureError && (
							<Snackbar autoHideDuration={6000} open={error.signatureError}>
								<Alert severity='error'>{error.signatureError}</Alert>
							</Snackbar>
						)}
						{error.serverError && (
							<Snackbar autoHideDuration={6000} open={error.serverError}>
								<Alert severity='error'>{error.serverError}</Alert>
							</Snackbar>
						)}
					</>
				) : (
					<div className={classes.finishPage}>
						<Typography Typography variant='h1' align='center'>
							<div className={classes.doneContainer}>
								<DoneIcon className={classes.doneIcon} />
							</div>
							{t('das_wars')}
						</Typography>
						<Typography variant='h2' align='center'>
							{t('bistro_personal')}
						</Typography>
						{setTimeout(() => {
							return window.location.replace('https://monza.rhythmspot.de');
						}, 3000)}
					</div>
				)}
			</Grid>
			{!finish && (
				<StepNavigation
					/* prevLink='/' */
					/* prevLabel='' */
					step={finish ? 4 : 3}
					disabled={loading ? true : false}
					disabledPrev={true}
					onClick={handleSubmit}
				/>
			)}
		</Grid>
	);
};

export default Finish;
