module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jquery": true // 考虑到传统 HTML 项目常配合 jQuery，默认开启，不需要可关闭
    },
    "extends": "eslint:recommended",
    "plugins": [
        "html"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-unused-vars": "warn",
        "no-console": "off",
        "no-undef": "warn" // 考虑到 HTML 项目中常有全局变量，降级为警告
    }
};
