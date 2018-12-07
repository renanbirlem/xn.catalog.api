module.exports = {
    env: {
        es6: true,
        node: true
    },
    plugins: ["jest"],
    extends: ["eslint:recommended", "plugin:jest/recommended"],
    parserOptions: {
        ecmaVersion: 9,
        sourceType: "module"
    },
    rules: {
        "no-unused-vars": [
            "error",
            {
                vars: "all",
                args: "none",
                ignoreRestSiblings: false,
                varsIgnorePattern: "(debug|log)"
            }
        ]
    }
};
