const path = require('path');

module.exports = {
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'build'),
    },
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
    open: {
      app: {
        name: 'google-chrome',
      },
    },
    hot: true,
    compress: true,
    port: 3000,
  },
};
