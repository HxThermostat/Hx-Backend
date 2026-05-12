module.exports = {
  env: {
    node: true,
    browser: false,
    jest: true,
    "react-native/react-native": true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "react-native"],
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react-native/no-inline-styles": "error"
  },
  ignorePatterns: ["graph/schema.tsx"]
};
