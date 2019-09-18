
const path = require('path')
const withLess = require('@zeit/next-less')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {}
}
const nextConfig = withLess({
  useFileSystemPublicRoutes: false,
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  webpack(config) {
    // const exlintRule = {
    //   enforce: 'pre',
    //   test: /.(js|jsx|tsx)$/,
    //   loader: 'eslint-loader',
    //   exclude: [
    //     path.resolve(__dirname, '/node_modules'),
    //   ],
    // }
    // config.module.rules.push(exlintRule)
    config.resolve.alias.components = path.join(__dirname, 'components')
    config.resolve.alias.static = path.join(__dirname, 'static')
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
})

module.exports = nextConfig;
