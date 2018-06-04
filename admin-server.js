/** Dependencies */
const
  express = require('express'),
  favicon = require('express-favicon'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  dotEnv = require('dotenv'),
  app = express();

/** Modules */
const
  dbModule = require('./backend/db-module'),
  apiModule = require('./backend/api-module');

/** Env variables */
dotEnv.load();


/** App setup */
app.set('defaultLanguage', 'en');
app.set('indexPage', __dirname + '/dist/top-plate-admin/index.html');
app.use(cookieParser());
app.use(favicon(__dirname + '/dist/top-plate-admin/assets/favicon.ico'));
app.use(bodyParser.json({
  parameterLimit: 500000,
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.urlencoded({
  parameterLimit: 1000000,
  limit: '100mb',
  extended: false
}));
app.use(express.static(getRelatedPath('/dist/top-plate-admin')));
app.use(express.static(getRelatedPath('/src/uploaded')));

global.getApp = () => app;

/** Run server */
runAdminServer();

/** Privates */
function getRelatedPath (destination) {
  return __dirname + destination;
}

function runAdminServer () {

  let server;

  dbModule.connect()
    .then(() => server = app.listen(process.env.PORT, () => onServerRun(server)))
    .catch(err => console.log(err));

  process.on('SIGINT', () => onServerClose(server));

  process.on('SIGTERM', () => onServerClose(server));

}

function onServerRun (server) {

  console.log('admin server is up on server ' + server.address().port);
  apiModule.refreshRoutes();


  // PING_URL && setInterval(() => {
  //   request.get(PING_URL, function (err, resp, body) {
  //     if (err) {
  //       console.log(PING_URL);
  //       console.log(err);
  //     }
  //     else {
  //       console.log(body);
  //     }
  //   });
  // }, 1000 * 60 * 10); /** Call self api every ten minutes to avoid server down with 143 err code */



}

function onServerClose (server) {
  server.close(() => {
    setTimeout(() => {
      dbModule.disconnect()
        .then(() => {
          console.log('db connection closed');
          process.exit(0);
        })
        .catch((err) => console.log(err));
    }, 3000);
  });
}

