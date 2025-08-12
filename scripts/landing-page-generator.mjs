import { resolve } from 'path';
import dotenv from 'dotenv';
// import { google } from 'googleapis'; // Commented out as Google Sheets is not accessible
import { getCssStringFromCommittee, generateCommittee } from './lib.mjs';

// .env config
dotenv.config({ path: '.env.local' });
const SPREADSHEET_ID = process.env.LANDING_SPREADSHEET_ID;
// const SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT ?? ''; // Commented out as Google Sheets is not accessible

//Grab main information to be displayed
//and write to output.json
async function getCommitteeInfo(name) {
  // const committees = await getGoogleSheetData('committee info!A:J'); // Commented out
  const committees = [
    [
      'Cloud',
      'ACM Cloud',
      'Subtitle',
      'Description',
      'logo.png',
      'discord.com',
      'instagram.com',
      'email@example.com',
      'favicon.ico',
      'background.png',
    ],
  ]; // Mock data to prevent build errors
  const committee = [];
  //get committee
  for (const row of committees) {
    //Skip header rows and example
    if (
      row.length < 5 ||
      row[0] === 'Committee' ||
      row[0].includes('Example:') ||
      row[0] != name
    ) {
      continue;
    }
    try {
      return generateCommittee({
        committee: row[0],
        name: row[1],
        subtitle: row[2],
        description: row[3],
        logoLink: row[4],
        dcLink: row[5],
        igLink: row[6],
        email: row[7],
        favicon: row[8],
        backgroundImg: row[9],
      });
    } catch (err) {
      console.error(`Error ${err} on committee ${row}`);
    }
  }

  return committee;
}

////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////

// Read data from Google sheets
// using sheet range (eg: 'Week 1!A:H)
// async function getGoogleSheetData(range) { // Commented out
//   const sheets = google.sheets({ version: 'v4' });

//   // Validate SERVICE_ACCOUNT
//   if (!SERVICE_ACCOUNT || SERVICE_ACCOUNT === '{}') {
//     console.error('SERVICE_ACCOUNT environment variable is missing or invalid.');
//     console.error('Ensure that .env.local contains a valid SERVICE_ACCOUNT JSON string.');
//     throw new Error('SERVICE_ACCOUNT environment variable is missing or invalid.');
//   }

//   // Get JWT Token to access sheet
//   const service_account = JSON.parse(SERVICE_ACCOUNT);
//   const jwtClient = new google.auth.JWT(
//     service_account.client_email,
//     '',
//     service_account.private_key,
//     ['https://www.googleapis.com/auth/spreadsheets'],
//   );
//   jwtClient.authorize(function (err) {
//     if (err) {
//       throw err;
//     }
//   });

//   // Get data from Google spreadsheets
//   const res = await sheets.spreadsheets.values.get({
//     auth: jwtClient,
//     spreadsheetId: SPREADSHEET_ID,
//     range: range,
//   });
//   const rows = res?.data.values;
//   if (!rows || rows.length == 0) {
//     console.log('Error: no data found');
//     return [];

//   return rows;
// }

export default getCommitteeInfo;
