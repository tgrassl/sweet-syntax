#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const arg = require("arg");
const logSymbols = require("log-symbols");
const pkg = require("../package");
const lib = path.join(path.dirname(fs.realpathSync(__filename)), "../lib");
const sweetSyntax = require(lib + "/sweet-syntax.js");

const success = message =>
  console.log(`${logSymbols.success} ${chalk.bold(message)}`);
const info = message => console.log(`${logSymbols.info} ${message}`);
const error = message => console.log(`${logSymbols.error} ${message}`);

const defaultConfigPath = "./sweet-syntax.json";

const getHelp = () => chalk`
  {bold.redBright sweet-syntax} - Add syntactic sugar to any language!
  {bold USAGE}
      {bold $} {redBright sweet-syntax} --help
      {bold $} {redBright sweet-syntax} --version
      {bold $} {redBright sweet-syntax} {underline inputFile} {underline outputFile} -c [{underline configFile}]
      By default, {redBright sweet-syntax} will search for a config file in the root of your current directory.
      If the config is located somewhere else use the {bold --config} argument.
  {bold OPTIONS}
      -h, --help                          Shows this help message
      -v, --version                       Displays the current version of {redBright sweet-syntax}
      -c, --config                        The config containing your sweet syntax
`;

const getConfig = args => {
  const configFile = args["--config"];
  if (configFile) {
    return parseFile(configFile);
  } else {
    return parseFile(defaultConfigPath);
  }
};

const parseFile = file => {
  if (fs.existsSync(file)) {
    const fileContents = fs.readFileSync(file, "utf8");
    return JSON.parse(fileContents);
  }
};

const transformToOutput = (config, file, output) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(file)) {
      if (fs.existsSync(output)) {
        fs.truncateSync(output);
      }

      const input = sweetSyntax.sweeten(config, fs.readFileSync(file, "utf8"));
      fs.appendFile(output, input, () => resolve());
    } else {
      reject(file);
    }
  });
};

(async () => {
  let args = null;

  try {
    args = arg({
      "--help": Boolean,
      "--version": Boolean,
      "--config": String,
      "-h": "--help",
      "-v": "--version",
      "-c": "--config"
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (args["--version"]) {
    console.log(pkg.version);
    return;
  }

  if (args["--help"]) {
    console.log(getHelp());
    return;
  }

  if (args._.length != 2) {
    error("Please provide an input and output file.");
    return;
  }

  const config = getConfig(args);
  if (config) {
    try {
      const inputFile = args._[0];
      const outputFile = args._[1];

      info(`Transforming ${inputFile} to ${outputFile}...`);
      await transformToOutput(config, inputFile, outputFile);
      success("Successfully transformed file!");
    } catch (err) {
      error(`Error during transformation: ${err}`);
    }
  } else {
    error("No config file found or specified.");
  }
})();
