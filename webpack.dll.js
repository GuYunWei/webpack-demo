var path = require("path");
var webpack = require("webpack");

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-actions',
    'es6-promise',
    'babel-polyfill',
    'redbox'
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, "dist", "dll"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname)
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        root: path.resolve(__dirname),
        modulesDirectories: ["node_modules"]
    }
};
