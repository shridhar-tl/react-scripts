const path = require('path');
const fs = require('fs-extra');
const configPath = path.join(process.cwd(), 'build.config.js');

let configOverride = {};

if (fs.existsSync(configPath)) {
    configOverride = require(configPath);
}

function applySettings() {
    const defaultConfig = {
        allowManifestFileGeneration: false,
        allowSourceMapForCSS: false,
    };

    return { ...defaultConfig, ...configOverride.applySettings?.(defaultConfig) };
}

function overrideExtensions(fileExtensions) {
    return configOverride.overrideExtensions?.(fileExtensions) ?? fileExtensions;
}

function overrideEntry(entry) {
    return configOverride.overrideEntry?.(entry) ?? entry;
}

function overrideOutput(output) {
    return configOverride.overrideOutput?.(output) ?? output;
}

function addPlugins(plugins, opts) {
    return configOverride.addPlugins?.(plugins, opts) ?? plugins;
}

function overridePlugins(plugins) {
    return configOverride.overridePlugins?.(plugins) ?? plugins;
}

function overrideWebPackConfig(config, opts) {
    return configOverride.overrideWebPackConfig?.(config, opts) ?? config;
}

function onBuildComplete(args) {
    return configOverride.onBuildComplete?.(args);
}

module.exports = {
    overrideExtensions,
    overrideEntry,
    overrideOutput,
    addPlugins,
    applySettings,
    overridePlugins,
    overrideWebPackConfig,
    onBuildComplete
};