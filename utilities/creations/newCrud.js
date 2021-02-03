const fs = require('fs');
const { validations } = require('../files/validations');
const { routes } = require('../files/routes');
const { controllers } = require('../files/controllers');
const { model } = require('../files/model');

const path = process.cwd();

exports.createController = (modelName) => {
  fs.appendFile(
    `${path}/controllers/${modelName}.controllers.js`,
    controllers(modelName),
    (err) => {
      if (err) throw err;
    }
  );
};
exports.createModel = (modelName) => {
  fs.appendFile(
    `${path}/models/${modelName}.model.js`,
    model(modelName),
    (err) => {
      if (err) throw err;
    }
  );
};
exports.createRoute = (modelName) => {
  fs.appendFile(
    `${path}/routes/${modelName}.routes.js`,
    routes(modelName),
    (err) => {
      if (err) throw err;
    }
  );
};

exports.createValidation = (modelName) => {
  fs.appendFile(
    `${path}/validations/${modelName}.validations.js`,
    validations(modelName),
    (err) => {
      if (err) throw err;
    }
  );
};
