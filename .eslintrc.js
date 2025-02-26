module.exports = {
    extends: 'expo',
    plugins: ["simple-import-sort"],
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    },
    overrides: [
      {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        rules: {
          "simple-import-sort/imports": [
            "error",
            {
              "groups": [
                // React and Expo first
                ["^react$", "^expo", "^[a-z]"],
                // Packages starting with @
                ["^@"],
                // Internal packages
                ["^components/", "^assets/", "^utils/"],
                // Parent imports
                ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                // Same-folder imports
                ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                // Style imports
                ["^.+\\.s?css$"],
                // Side effect imports
                ["^\\u0000"]
              ]
            }
          ]
        }
      }
    ]
  };
  