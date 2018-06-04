const
  Q = require('q'),
  authModule = require('./auth-module'),
  dbModule = require('./db-module');

module.exports.refreshRoutes = () => {

  let
    app = global.getApp(),
    indexPage = app.get('indexPage');

  app.get('/', (req, res) => res.sendFile(indexPage));

  app.post('/sign-in', (req, res) => {
    let reqBody = req.body;

    authModule.checkCredentials(reqBody.login, reqBody.password)
      .then(successResult => res.send(successResult))
      .catch(err => sendError(res, err));
  });

  app.post('/check-authorization', (req, res) => {
    let reqHeaders = req.headers;
    authModule.checkAuthorization(reqHeaders['access-token'])
      .then(successResult => res.send(successResult))
      .catch(err => sendError(res, err));
  });

  app.get('/get-general-data', (req, res) => checkAuthorization(req)
    .then(() => {
      dbModule.getModel('Base').findOne()
        .then(baseData => res.send(baseData))
        .catch(err => sendError(res, err));
    })
    .catch(err => sendError(err))
  );

  app.post('/update-general-data', (req, res) => checkAuthorization(req)
    .then(() => {
      let reqBody = req.body;
      dbModule.getModel('Base').findOne()
        .then(baseData => {
          Object.keys(reqBody || {}).forEach(key => baseData[key] = reqBody[key]);

          console.log(baseData, reqBody);

          baseData.save(err => {
            if (err) sendError(res, err);
            else res.send({message: 'updated'});
          });
        })
        .catch(err => sendError(res, err));
    })
    .catch(err => sendError(err))
  );

  app.get('/get-users-data', (req, res) => {
    checkAuthorization(req)
      .then(() => {
        let
          params = req.query,
          sortBy = params.sortBy,
          useFilter = params.useFilter !== 'all',
          query = {},
          sortQuery = {};

        // if (useFilter) query['status'] = useFilter;
        // if (sortBy) sortQuery[sortBy] = params.reversed === 'true' ? 1 : -1;
        dbModule.getModel('User').find(query)
          // .sort(sortQuery)
          .then(users => res.send(users.map(user => user.getNormalized())))
          .catch(err => sendError(res, err));
      })
      .catch(err => sendError(err))
  })
};

function checkAuthorization (req) {
  let
    deferred = Q.defer(),
    reqHeaders = req.headers;

  authModule.checkAuthorization(reqHeaders['access-token'])
    .then(successResult => deferred.resolve(successResult))
    .catch(err => deferred.reject(err));

  return deferred.promise;
}

function sendError (res, err) {
  console.log(err);
  res.status(err.status || 500).send(err);
}
