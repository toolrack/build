#!/usr/bin/env node
const path = require('path');

const { merge } = require("webpack-merge");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { getArg, ARGS } = require('./helpers/argv');

const config = getConfig();
const compiler = webpack(config);

if (getArg(ARGS.WATCH)) {
    compiler.watch({}, (err, stats) =>  print(stats));
} else {
    compiler.run(runCallback);
}

function runCallback(err, stats) {
    print(stats);
    if (err) return console.error(err);

    compiler.close((closeErr) => {
        if (closeErr) console.error(closeErr);
    });

    if (getArg(ARGS.SERVER)) {
        start(config)
    }
}

function start(serverConfig) {
    const server = new WebpackDevServer(serverConfig.devServer, compiler);
    console.log('Starting server...');
    server.start();
}

function getConfig() {
    let config = require(path.resolve(__dirname, 'webpack.config.js'));

    if (getArg(ARGS.SERVER)) {
        config = merge(config, require(path.resolve(__dirname, 'webpack.server.js')));
        let browser = getArg(ARGS.BROWSER) || 'google-chrome';
        if (browser) {
            config.devServer.open.app.name = browser;
        }
    }

    const patchConfig = require(path.resolve(process.cwd(), getArg(ARGS.PATH) || 'webpack.config.js'));
    config = merge(config, patchConfig);

    if (config.mode === 'development') {
        // config.devtool = 'inline-source-map';
    }

    config.entry = path.resolve(process.cwd(), config.entry);
    return config;
}

function print(stats) {
    console.log(stats.toString({
        chunks: true,
        colors: true,
    }));
}
