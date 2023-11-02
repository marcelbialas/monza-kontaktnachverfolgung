# Monza Indoor Kart GmbH - Corona Kontaktnachverfolgung

Da aufgrund der Corona-Maßnahmen im Jahr 2021 eine Kontaktnachverfolgung für Unternehmen vorgeschrieben war, haben wir uns anstelle von Stift- und Papier Gedanken gemacht, wie man das Ganze digital umsetzen kann. Als Hardware-Komponenten vor Ort haben wir 3 Tablets fest installiert, auf denen eine Kiosk-Software (https://www.fully-kiosk.com/de/) zum Einsatz kam, um dem Kunden nur Zugriff auf den Browser zu gewähren und auch eine Fernwartung und Logging-Möglichkeit zu gewährleisten. Da im Unternehmen bereits Google Workspace zum Einsatz kommt, haben wir uns gegen ein CRM-System als Backend entschieden und Google Spreadsheets als Datenspeicher gewählt. Neben der Erfassung der erforderlichen Kontaktdaten haben wir den Kunden noch durch Regeln und Flaggenkunde geführt und konnten außerdem einige Kunden für unseren Newsletter gewinnen. Da wir auch nicht deutschsprachige Kunden haben, wurde eine Übersetzung mit i18n umgesetzt.

Im Backend haben wir einen vServer mit Nginx aufgesetzt und einen Reverse-Proxy für die Node.js Express API eingerichtet. Mit PM2 wurde der API-Server automatisch mit dem vServer gestartet. Mithilfe der Google Spreadsheets API konnten wir verschiedene Aktionen durchführen.

## Features:

- **Registrieren von Kunden:** Die Daten vom Frontend wurden per REST-API ans Backend übermittelt und in das entsprechende Tabellenblatt eingefügt. Jeder Kunde hat einen Timestamp erhalten mit einer geschätzten Aufenthaltsdauer. Durch die Nutzung von Google-Tabellen war es für uns einfach, zum Tagesende eine Liste mit allen Besucherdaten auszudrucken und ggf. dem Gesundheitsamt zur Verfügung zu stellen. Neue Anmeldungen konnte das Bistropersonal und auch die Rennleitung in einer Übersichtsseite sehen und so nachvollziehen, ob alle Daten korrekt und vollständig eingetragen wurden. Außerdem erhielten wir so wichtige Informationen, wie viele Kunden sich gleichzeitig in der Halle aufhielten, und die Rennleitung konnte z.B. bei Rennen die Fahrernamen übernehmen.

- **Check-in bei bestehenden Kunden:** Wurde die E-Mail-Adresse bereits bei uns im System erfasst, so gab es die Möglichkeit für den Kunden sich einfach "einzuchecken". Das ersparte dem Kunden die erneute Eingabe der Daten und wir konnten sehen, wie viele Kunden wiederkehrend sind. Da es in der Spreadsheet-API keine Möglichkeit gab, Datensätze z.B. anhand der E-Mail-Adresse zu suchen, haben wir eine "LookUp"-Tabelle erstellt, in welcher eine einfache Spreadsheet-Formel verwendet wurde, um die entsprechende Zellen-Nummer zu erhalten, falls der Kunde bereits registriert war. Anschließend war es möglich, die Zelle "Letzter Besuch" zu erweitern und den Kunden einzuchecken.

## Technologien:

- Hardware: Tablets mit Kiosk-Software
- Backend-Server: vServer mit Nginx und Node.js Express API
- Datenbank: Google Spreadsheets
- Übersetzung: i18n (Internationalisierung)
- Remote-Wartung und Logging: Fully Kiosk
