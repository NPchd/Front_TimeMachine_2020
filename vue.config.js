const fs = require('fs');

module.exports = {
  // options...
  devServer:{
    disableHostCheck: true,
      https: {
        key: fs.readFileSync('./cert/selfsigned_key.pem'),
        cert: fs.readFileSync('./cert/selfsigned.pem')
      }
    }
}