const config = require('./webpack.config.js');
const path = require('path');

const dev = {
  ...config,
  devtool: 'inline-source-map',
  mode: 'development',
};
//increase hot-reload performance
dev.module.rules.map((obj)=>{
  if(obj.test.test('.css') || obj.test.test('.vcss') || obj.test.test('.scss')) {
    obj.use = [
      'style-loader',
      'css-loader',
      'sass-loader',
    ]
  }
});
dev.resolve.alias.vue = 'vue/dist/vue.js';
dev.resolve.alias['api-config'] = path.resolve(__dirname, 'api.dev.js');
module.exports = dev;
