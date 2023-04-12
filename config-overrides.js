const { addWebpackModuleRule, override } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.txt$/,
    use: 'raw-loader',
  }),
);