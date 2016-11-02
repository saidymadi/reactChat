module.exports = require('./webpack.config.js')({
  isProduction: true,
  devtool: 'source-map',
  jsFileName: 'app.123.js',
  cssFileName: 'app.123.css',
});
