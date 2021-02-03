const fs = require('fs');
const { server } = require('../files/server');
const { validations } = require('../files/validations')
const { routes } = require('../files/routes')
const { controllers } = require('../files/controllers')
const { model } = require('../files/model')
const { env } = require('../files/.env')
const path = process.cwd();


exports.createController = (modelName) => {
  fs.mkdir(`${path}/controllers`, function () {
    fs.appendFile(`${path}/controllers/${modelName}.controllers.js`, controllers(modelName), function (err) {
      if (err) throw err;
    });
  })
}
exports.createModel = (modelName) => {
  fs.mkdir(`${path}/models`, function () {
    fs.appendFile(`${path}/models/${modelName}.model.js`, model(modelName), function (err) {
      if (err) throw err;
    });
  })
}
exports.createRoute = (modelName) => {
  fs.mkdir(`${path}/routes`, function () {
    fs.appendFile(`${path}/routes/${modelName}.routes.js`, routes(modelName), function (err) {
      if (err) throw err;
    });
  })
}

exports.createValidation = (modelName) => {
  fs.mkdir(`${path}/validations`, function () {
    fs.appendFile(`${path}/validations/${modelName}.validations.js`, validations(modelName), function (err) {
      if (err) throw err;
    });
  })
}
exports.createConfig = () => {
  fs.mkdir(`${path}/config`, function () {
    fs.appendFile(`${path}/config/.env`, env(), function (err) {
      if (err) throw err;
    });
  })
}
exports.createServer = (modelName) => {
  fs.appendFile(`${path}/server.js`, server(modelName), function (err) {
    if (err) throw err;
  })
}

exports.gitignore = () => {
  fs.appendFile(`${path}/.gitignore`,
    `/node_modules
    .prettier
    .eslintrc.json`
    ,
    function (err) {
      if (err) throw err;
    });
}
exports.readme = () => {
  fs.appendFile(`${path}/mernp.README.md`,
    `/mern pack 
     `
    ,
    function (err) {
      if (err) throw err;
    });
}

exports.scripts = () => {
  fs.readFile(`${path}/package.json`, "utf-8", (err, data) => {
    let package = JSON.parse(data);
    if (!err) {
      package.scripts.dev = "nodemon server.js"
    }
    fs.writeFile(`./package.json`, JSON.stringify(package), (err) => {
      err
        ? console.log("err", err)
        : console.log('package.json updated !')
    })
  });
}
