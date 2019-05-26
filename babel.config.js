const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: "12",
                ie: "10",
                firefox: "40",
                chrome: "40",
                safari: "10",
            },
            // corejs: "2",
            // useBuiltIns: "usage",
        },
    ],
];

const plugins = [
    [
        "import",
        {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
        }
    ],
    "@babel/plugin-syntax-dynamic-import",
    // "@babel/plugin-transform-async-to-generator",
    ["@babel/plugin-transform-runtime", {"corejs": 2}],

];

module.exports = {presets, plugins};
