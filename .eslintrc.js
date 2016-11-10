{
    "env": {
        "es6": true
        , "node": true
        , "jasmine": true
    }
    , "rules": {
        "indent": [1, "tab", {
            "SwitchCase": 1
        }]
        , "linebreak-style": [2, "unix"]
        , "quotes": [1, "single"]
        , "semi": [1, "never"]
        , "require-jsdoc": [1, {
            "require": {
                "FunctionDeclaration": true
                , "MethodDefinition": true
                , "ClassDeclaration": true
            }
        }]
        , "valid-jsdoc": 1
        , "no-multi-spaces": 2
        , "no-trailing-spaces": 1
        , "space-before-function-paren": [2, "never"]
        , "key-spacing": ["error", {
            "beforeColon": false
            , "afterColon": true
        }]
        , "arrow-body-style": 2
        , "arrow-spacing": [1, {
            "before": true
            , "after": true
        }]
        , "no-var": 2
        , "prefer-const": 2
        , "brace-style": 2
        , "eqeqeq": 2
        , "no-cond-assign": 2
        , "no-dupe-args": 2
        , "no-dupe-keys": 2
        , "no-duplicate-case": 2
        , "no-empty": 1
        , "no-extra-parens": 2
        , "no-func-assign": 2
        , "no-irregular-whitespace": 2
        , "no-unexpected-multiline": 2
        , "no-unreachable": 2
        , "no-empty-function": 2
        , "no-magic-numbers": [1, {
            "ignore": [-1, 0, 1]
        }]
        , "no-multi-str": 1
        , "no-self-assign": 2
        , "yoda": 2
        , "strict": [2, "global"]
        , "no-undef": 2
        , "no-unused-vars": 1
        , "global-require": 2
        , "handle-callback-err": 2
        , "eol-last": 1
        , "no-multiple-empty-lines": 1
    }
}