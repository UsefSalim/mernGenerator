const fs = require('fs');

const path = process.cwd();
exports.vsCodeConfig = () => {
  fs.mkdir(`${path}/.vscode`, () => {
    fs.appendFile(
      `${path}/.vscode/settings.json`,
      `{
        "editor.formatOnSave": true,
        "editor.tabSize": 2,
        "[javascript]": {
          "editor.formatOnSave": false
        },
        "editor.codeActionsOnSave": {
          "source.fixAll": true
        }
      }`,
      (err) => {
        if (err) throw err;
      }
    );
  });
};

exports.prettier = () => {
  fs.appendFile(
    `${path}/.prettierrc`,
    `{
      "printWidth": 80,
      "tabWidth": 2,
      "semi": true,
      "singleQuote": true,
      "trailingComma": "es5",
      "bracketSpacing": true,
      "jsxBracketSameLine": false
    }`,
    (err) => {
      if (err) throw err;
    }
  );
};
exports.eslint = () => {
  fs.appendFile(
    `${path}/.eslintrc.json`,
    ` {
      "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
      },
      "extends": ["airbnb-base", "prettier"],
      "plugins": ["prettier"],
      "parserOptions": {
        "ecmaVersion": 12
      },
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "endOfLine": "auto"
          }
        ],
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": "off",
        "no-confusing-arrow": "off",
        "linebreak-style": "off",
        "no-unused-expressions": "off",
        "no-use-before-define": "off",
        "no-shadow": "off",
        "arrow-parens": ["off"],
        "comma-dangle": [
          "error",
          {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "ignore"
          }
        ],
        "no-plusplus": "off",
        "complexity": ["error", 4],
        "default-case": "error"
      }
    }`,
    (err) => {
      if (err) throw err;
    }
  );
};

exports.prettierScripts = () => {
  fs.readFile(`${path}/package.json`, 'utf-8', (err, data) => {
    const jsonPack = JSON.parse(data);
    if (!err) {
      jsonPack.scripts.eslint =
        'npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-config-airbnb-base';
    }
    fs.writeFile(`./package.json`, JSON.stringify(jsonPack), (err) => {
      err ? console.log('err', err) : console.log('package.json updated !');
    });
  });
};
