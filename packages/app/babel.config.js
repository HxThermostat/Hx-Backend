module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "~": "./",
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
};
