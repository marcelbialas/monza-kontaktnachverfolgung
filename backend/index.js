/* ONLY FOR TESTING ; NOT REAL BACKEND */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

/* CONFIGURE BODYPARSER */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

/* CONFIGURE CORS WHITELIST */
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

/* API IMPRORTS */
let privatekey = require("./privateKey.json");
const { google } = require("googleapis");

/* CONFIGURE JWT FOR API AUTH */
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

app.post("/addCustomer", (req, res) => {
  /* CHECK INCOMING DATA AND CONFIGURE OBJECT */
  /* ... */

  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      // * AUTHORIZATION SUCCESSFUL, AUTHORIZE AS CLIENT AND SEND REQUEST
      const oauth2Client = new google.auth.OAuth2(
        privatekey.client_id,
        privatekey.private_key
      );
      oauth2Client.setCredentials({
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
      });

      // * INSERT DATA INTO SHEET
      const sheets = google.sheets({ version: "v4", oauth2Client });
      sheets.spreadsheets.values.append(
        {
          spreadsheetId: "18gj6C-kV28SN4KBRz5hUgceiu5iw-_f92Rj8ZPRWh1M",
          range: "Kundendatenbank",
          valueInputOption: "RAW",
          insertDataOption: "INSERT_ROWS",
          resource: {
            values: [
              [
                519942 + 1,
                "MT_0000F1BC49",
                true,
                req.body.firstName,
                req.body.lastName,
                12345,
                "Castrop-Rauxel",
                "Musterstraße 41",
                req.body.email,
                true,
                "02325988288",
                true,
                true,
                "",
                new Date().toLocaleString(),
              ],
            ],
          },
          auth: oauth2Client,
        },
        (err, response) => {
          if (err) {
            res.status(500).send({ error: err });
          }
          if (response) {
            res.send("successfully created entry");
          }
        }
      );
    }
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
