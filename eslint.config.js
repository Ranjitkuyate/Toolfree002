{
  "root": true,
  "extends": ["next/core-web-vitals", "eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  "plugins": ["@typescript-eslint", "react"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
