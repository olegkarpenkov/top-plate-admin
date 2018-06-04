let
  Q = require('q'),
  bCrypt = require('bcrypt'),
  authorizedAdmins = {};

module.exports.checkCredentials = checkCredentials;

module.exports.getLocalToken = getLocalToken;

module.exports.checkAuthorization = checkAuthorization;

function checkCredentials (login, pswrd) {
  let
    deferred = Q.defer(),
    adminLogin = process.env.SUPER_ADMIN_LOGIN,
    adminPswrd = process.env.SUPER_ADMIN_PSWRD;

  if (adminLogin === login && adminPswrd === pswrd) getLocalToken()
    .then(token => {
      authorizedAdmins[token] = {login: login, pswrd: pswrd};
      deferred.resolve({'access-token': token});
    });
  else deferred.reject({message: 'login or password is incorrect', status: 401});

  return deferred.promise;
}

function getLocalToken () {
  let deferred = Q.defer();

  bCrypt.genSalt(10, false, (err, token) => {
    if (err) deferred.reject(err);
    else deferred.resolve(token);
  });

  return deferred.promise;
}

function checkAuthorization (token) {
  let deferred = Q.defer();

  if (authorizedAdmins[token]) deferred.resolve({message: 'is authorized'});
  else deferred.reject({message: 'not authorized', status: 401});

  return deferred.promise;
}
