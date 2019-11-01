const replaceAll = (str, replacements) => {
  const re = new RegExp(Object.keys(replacements).join("|"), "g");

  return str.replace(re, match => {
    return replacements[match];
  });
};

const sweeten = (config, input) => {
  Object.keys(config).forEach(key => {
    if (Object.keys(config[key]).length > 0) {
      input = replaceAll(input, config[key]);
    }
  });
  return input;
};

module.exports = {
  sweeten
};
