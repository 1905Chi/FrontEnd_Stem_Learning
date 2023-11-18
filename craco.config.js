// webpack.config.js hoặc tên tệp cấu hình webpack của bạn
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};

  