module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals", "eslint:recommended", "plugin:react/recommended"],
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
