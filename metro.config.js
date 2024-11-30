const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Comment out or remove the next line to enable Watchman
// config.resolver.useWatchman = false;

module.exports = withNativeWind(config, { input: "./global.css" });
