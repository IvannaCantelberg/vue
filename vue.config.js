const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, '../backend-app/client'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
