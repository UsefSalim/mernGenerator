#!/usr/bin/env node
const program = require('commander');
const {
  createController,
  createConfig,
  createModel,
  createRoute,
  createServer,
  gitignore,
  createValidation,
  readme,
  scripts,
} = require('./utilities/creations/starter');
const {
  eslint,
  prettier,
  vsCodeConfig,
  prettierScripts,
} = require('./utilities/creations/eslint.prettier');

program.version('1.0.0').description('test');

program
  .option('-jv, --joivalidate', 'add validations')
  .option('-m, --model', 'add model')
  .option('-c, --controller', 'add controller')
  .option('-r, --router', 'add router');
/// starter pack
const options = program.opts();
program
  .command('make:server <ModelName>')
  .alias('ms')
  .description('create squelette api with mongoose express nodejs joi')
  .action((modelName) => {
    createConfig(modelName);
    createController(modelName);
    createModel(modelName);
    createRoute(modelName);
    createServer(modelName);
    createValidation(modelName);
    readme();
    gitignore();
    scripts();
    console.info(`application created succesfuly run -npm run dev-`);
  });
/// configurations Prettier and eslint

program
  .command('make:prettier')
  .alias('mp')
  .description('configurations and generate file prettier ans eslint ')
  .action(() => {
    eslint();
    prettier();
    vsCodeConfig();
    prettierScripts();
    console.info('prettier configurate succesfully -> npm run eslint');
  });

program
  .command('make:controller <controllerName>')
  .alias('mc')
  .description('create controller')
  .action((controllerName) => {
    createController(controllerName, false);
    if (options.controller) {
      console.log("la commande -c n'est pas autorisé dans un controller");
    }
    if (options.model) createModel(controllerName);
    if (options.joivalidate && options.model) createValidation(controllerName);
    if (options.router) createRoute(controllerName);
  });

program
  .command('make:model <modelName>')
  .alias('mm')
  .description('create model')
  .action((modelName) => {
    createModel(modelName);
    if (options.model) {
      console.log("la commande -m n'est pas autorisé dans un model");
    }
    if (options.joivalidate) createValidation(modelName);
    if (options.controller) createController(modelName);
    if (options.router) createRoute(controllerName);
  });

program
  .command('make:route <routeName>')
  .alias('mr')
  .description('create Routes')
  .action((routeName) => {
    createRoute(routeName);
    if (options.router) {
      console.log("la commande -r n'est pas autorisé dans une route");
    }
    if (options.joivalidate && options.model) createValidation(routeName);
    if (options.controller) createController(routeName);
    if (options.model) createRoute(routeName);
  });

program.parse(process.args);

// shell nom
// process.cwd( ) lancement
