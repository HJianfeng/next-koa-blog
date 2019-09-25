/* eslint-disable consistent-return */

const path = require('path');
const withLess = require('@zeit/next-less');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}
const nextConfig = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  useFileSystemPublicRoutes: false,
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  webpack(config) {
    config.resolve.alias.components = path.join(__dirname, 'components');
    config.resolve.alias.static = path.join(__dirname, 'static');
    config.resolve.alias['@'] = path.join(__dirname, './');
    return config;
  },
});

module.exports = nextConfig;
