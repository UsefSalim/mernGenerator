#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');

const { log: l } = console;
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
  .option('-m , --model', 'add model')
  .option('-c , --controller', 'add controller')
  .option('-r , --router', 'add router');
/// starter pack
const options = program.opts();
program
  .command('  make:server <ModelName>')
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
    l(
      chalk.green(
        'application created succesfuly run ',
        `${chalk.underline.bgBlue('npm run dev')}!`
      )
    );
  });
/// configurations Prettier and eslint

program
  .command('  make:prettier')
  .alias('mp')
  .description('configurations and generate file prettier ans eslint ')
  .action(() => {
    eslint();
    prettier();
    vsCodeConfig();
    prettierScripts();
    l(
      chalk.green(
        'prettier configurate succesfully ',
        `${chalk.underline.bgBlue(' npm run eslint')}!`
      )
    );
  });

program
  .command('  make:controller <controllerName>')
  .alias('mc')
  .description('create controller')
  .action((controllerName) => {
    createController(controllerName, false);
    l(chalk.green(`${controllerName}.controller.js created succesfuly`));
    if (options.controller) {
      l(
        chalk.red.underline.bold(
          "la commande -c n'est pas autorisé dans un controller"
        )
      );
    }
    if (options.model) {
      createModel(controllerName);
      l(chalk.green(`${controllerName}.model.js created succesfuly`));
    }
    if (options.joivalidate && options.model) {
      createValidation(controllerName);
      l(chalk.green(`${controllerName}.validations.js created succesfuly`));
    }
    if (options.router) {
      createRoute(controllerName);
      l(chalk.green(`${controllerName}.routes.js created succesfuly`));
    }
  });

program
  .command('  make:model <modelName>')
  .alias('mm')
  .description('create model')
  .action((modelName) => {
    createModel(modelName);
    if (options.model) {
      l(
        chalk.red.underline.bold(
          "la commande -m n'est pas autorisé dans un model"
        )
      );
    }
    if (options.joivalidate) {
      createValidation(modelName);
      l(chalk.green(`${modelName}.validations.js created succesfuly`));
    }
    if (options.controller) {
      createController(modelName);
      l(chalk.green(`${modelName}.controllers.js created succesfuly`));
    }
    if (options.router) {
      createRoute(modelName);
      l(chalk.green(`${modelName}.routes.js created succesfuly`));
    }
  });

program
  .command('  make:route <routeName>')
  .alias('mr')
  .description('create Routes')
  .action((routeName) => {
    createRoute(routeName);
    if (options.router) {
      l(
        chalk.red.underline.bold(
          "la commande -r n'est pas autorisé dans une route"
        )
      );
    }
    if (options.joivalidate && options.model) {
      createValidation(routeName);
      l(chalk.green(`${routeName}.validations.js created succesfuly`));
    }
    if (options.controller) {
      createController(routeName);
      l(chalk.green(`${routeName}.controllers.js created succesfuly`));
    }
    if (options.model) {
      createRoute(routeName);
      l(chalk.green(`${routeName}.model.js created succesfuly`));
    }
  });

program.parse(process.args);

// shell nom
// process.cwd( ) lancement
