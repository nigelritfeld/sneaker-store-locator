module.exports = function(api) {
  api.cache(false);
  return {
    plugins: [
      ["module:react-native-dotenv"],
      ["react-native-reanimated/plugin"],
    ],
    presets: ['babel-preset-expo'],
  };
};
