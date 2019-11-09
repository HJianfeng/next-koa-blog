/* eslint-disable consistent-return */

const path = require('path');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}
const nextConfig = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  useFileSystemPublicRoutes: false,
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return 'v1';
  },
  webpack(config, ...args) {
    config = withCSS().webpack(config, ...args);
    config.resolve.alias.components = path.join(__dirname, 'components');
    config.resolve.alias.static = path.join(__dirname, 'static');
    config.resolve.alias['@'] = path.join(__dirname, './');
    config.resolve.alias['@store'] = path.join(__dirname, 'store/Reducer');
    return config;
  }
});

module.exports = nextConfig;
