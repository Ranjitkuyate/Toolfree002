module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "no-console": "warn",
  },
};
