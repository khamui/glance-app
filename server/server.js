//DONE: reduce complexity on server side, no resourcebuilder, instead using data rightaway?

/* eslint brace-style: ["error", "stroustrup"] */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// some settings
const DESTINATION_URL = 'http://localhost:9000';
const SOURCE_PORT = 1337;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', DESTINATION_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  next();
});

const dbconnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'glanceDB',
  multipleStatements: true
});

const baseurl = '/api';

// START DB CONNECTION
(async () => {
  await dbconnect.connect((error) => {
    if (error) throw error;
    console.log('server started. connection successful.');
  });


// NEW ENDPOINTS
// entire data of glance by glance id

  await app.post(baseurl + '/login', (req, resp) => {
    console.log(req.body);
    getUser(req.body)
      .then((result) => {
        console.log(result);
        resp.send(result[0]);
      })
      .catch(() => resp.send('User with ID does not exist.'));
  });

  await app.get(baseurl + '/sheets/:gla_id', (req, resp) => {
    getSheetsByGlance(req.params['gla_id'])
      .then((result) => resp.send(result))
      .catch(() => resp.send('Resource with ID does not exist.'));
  });

  await app.get(baseurl + '/sheets/:gla_id/:type/:sheet_id', (req, resp) => {
    getSheetValues(req.params['sheet_id'])
      .then((result) => resp.send(result))
      .catch(() => resp.send('Resource with ID does not exist.'));
  });

  await app.post(baseurl + '/sheets/:gla_id/:type', (req, resp) => {
    createSheet(req.body)
      .then((result) => resp.send(result))
      .catch(() => resp.send('Resource with ID does not exist.'));
  });

  // projects
  await app.get(baseurl + '/projects/:uid', (req, resp) => {
    getProjectsByUser(req.params['uid'])
      .then((result) => resp.send(result))
      .catch(() => resp.send('Resource with ID does not exist.'));
  });

  await app.post(baseurl + '/projects', (req, resp) => {
    createProject(req.body)
      .then((result) => resp.send(result))
      .catch(() => resp.send('Resource with ID does not exist.'));
  });

  await console.log('Endpoints created.');
  // dbconnect.end();
})();

// MAIN DB CALL
function getFromDatabaseBy(sql) {
  return new Promise((res,rej) => {
    dbconnect.query(sql, (error, result, fields) => {
      (error) ? rej(error) : res(result);
    });
  });
}

// NEW DB QUERIES
async function getUser(reqbody) {
  let sql =
  `SELECT * FROM tbl_user
  WHERE tbl_user.email='${reqbody['user']}' 
  AND tbl_user.authpass='${reqbody['authpass']}'`;
  
  const result = await getFromDatabaseBy(sql);

  return !!result[0] && result || new Error('no user found');
}

async function getSheetsByGlance(glaId) {
  let sql =
  `SELECT * FROM tbl_sheet
  WHERE tbl_sheet.gla_id='${glaId}'`;
  return await getFromDatabaseBy(sql);
}

async function getSheetValues(sheetId) {
  let sql =
  `SELECT * FROM tbl_hot
  WHERE tbl_hot.sheet_id='${sheetId}'`;
  return await getFromDatabaseBy(sql);
}

async function createSheet(resource) {
  const sheetIdSql = 
    `SELECT sheet_id FROM tbl_sheet WHERE type='${resource.resourcetype}'
      AND gla_id=${resource.glaId}`;
  const packet = await getFromDatabaseBy(sheetIdSql);
  let sql = `DELETE FROM tbl_hot WHERE sheet_id=${packet[0].sheet_id};\n`;
  for (let row of resource.data) {
    const catData = JSON.stringify(row.slice(2));
    sql = sql.concat(
      `
      INSERT INTO tbl_hot (sheet_id,cat_data)\n
      VALUES (${packet[0].sheet_id},'${catData}');\n\n`);
    }
    return await getFromDatabaseBy(sql);
  }
  
async function getProjectsByUser(uid) {
  let sql =
  `SELECT * FROM tbl_project
  WHERE tbl_project.user='${uid}'`;
  return await getFromDatabaseBy(sql);
}

async function createProject(project) {
  let glaIdSql = 'SELECT MAX(gla_id) AS value FROM tbl_project';
  const maxGlaId = await getFromDatabaseBy(glaIdSql);
  let sql =
    `INSERT INTO tbl_project (user,gla_id,gla_name,gla_settings)\n
    VALUES (${project.user},${maxGlaId[0].value + 1},'${project.gla_name}','${project.gla_settings}');\n\n`;
  return await getFromDatabaseBy(sql);
}

// LISTEN
app.listen(SOURCE_PORT);
