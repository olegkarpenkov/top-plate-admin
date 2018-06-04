const
  Q = require('q'),
  mongoose = require('mongoose'),
  ObjectId = require('mongodb').ObjectID,
  models = {},
  methods = {
    connect: (dbPath, dbName) => {
      let
        app = global.getApp(),
        path = [dbPath || app.get('dbPath'), dbName || app.get('dbName')].join('/') ;

      return mongoose.connect(process.env.MONGODB_URI || path);
    },

    disconnect: () => mongoose.disconnect()
  };

module.exports.connect = methods.connect;

module.exports.disconnect = methods.disconnect;

module.exports.getModels = () => models;

module.exports.getModel = modelName => models[modelName];

refreshMongoose();
refreshBaseSchema();
refreshUserSchema();
refreshPlateSchema();
refreshCharitySchema();
refreshWinnerSchema();

function refreshMongoose () {
  mongoose.Promise = Promise;
  mongoose.set('debug', false);
}

function refreshBaseSchema () {
  const baseSchema = new mongoose.Schema({
    name: String,
    description: String,
    logo: String,
    phone: String,
    fax: String,
    address: String,
    email: String,
    hasWinners: Boolean,
    platesRestored: Boolean
  }, {
    collection: 'base'
  });

  models.Base = mongoose.model('Base', baseSchema);
}

function refreshUserSchema () {
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    customProfile: {
      image: String,
      name: String
    },
    local: {
      image: String,
      lastName: String,
      firstName: String,
      hashedPassword: String
    },
    google: {
      id: String,
      image: String,
      name: String
    },
    facebook: {
      id: String,
      image: String,
      name: String
    },
    lastLogged: {
      provider: String,
      token: String
    },
    currentToken: String,
    uploadedPlates: [String],
    likedPlates: [String],
    charityVotes: [String],
    isRobot: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }, {
    collection: 'registered-users',
    timestamps: true
  });

  userSchema.methods.getNormalized = function () {
    let
      user = this,
      lastUsedProvider = user.isRobot ? 'google' : user.lastLogged.provider,
      userData = user[lastUsedProvider],
      normailzedData = {};

    normailzedData._id = user._id;
    normailzedData.email = user.email;
    normailzedData.name = userData.name;
    normailzedData.provider = lastUsedProvider;
    normailzedData.uploadedPlates = user.uploadedPlates;
    normailzedData.likedPlates = user.likedPlates;
    normailzedData.charityVotes = user.charityVotes;

    return normailzedData;
  };

  models.User = mongoose.model('User', userSchema);


}

function refreshPlateSchema () {

  const plateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    environment: {
      type: String,
      required: true
    },
    email: String,
    imageSource: {
      type: String,
      required: true
    },
    imageBinaryData: {
      type: Buffer,
      required: true
    },
    imageExtension: {
      type: String,
      required: true
    },
    imageContentType: {
      type: String,
      required: true
    },
    geo: [Number], /** long lat double */
    country: String,
    city: String,
    address: String,
    recipe: String,
    ingredients: [String],
    restaurantName: {
      type: String,
      required: true
    },
    likes: [String],
    author: {
      id: String,
      name: String,
      image: String
    },
    isReady: Boolean,
    canLike: Boolean,
    isFixed: Boolean,
    isTest: Boolean
  }, {
    collection: 'plates',
    timestamps: true
  });

  plateSchema.index({environment: 1});
  models.Plate = mongoose.model('Plate', plateSchema);
}

function refreshCharitySchema () {

  const charitySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    votes: [String]
  }, {
    collection: 'charities',
    timestamps: true
  });

  models.Charity = mongoose.model('Charity', charitySchema);
}

function refreshWinnerSchema () {

  const winnerSchema = new mongoose.Schema({
    environment: String,
    name: String,
    year: Number,
    month: Number,
    week: Number,
    likes: Number,
    plate: String
  }, {
    collection: 'winners',
    timestamp: true
  });

  models.Winner = mongoose.model('Winner', winnerSchema);
}





