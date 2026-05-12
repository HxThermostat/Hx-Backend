module.exports = {
  env: {
    node: true,
    browser: false,
    jest: true,
  },
  rules: {
    "promise/always-return": "off",
    "promise/no-promise-in-callback": "off",
  },
  settings: {
    "import/core-modules": ["test-utils"],
  },
};
