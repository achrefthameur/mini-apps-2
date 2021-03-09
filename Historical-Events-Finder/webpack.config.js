var path = require('path')


module.exports ={
    mode:'development',
    entry : path.resolve(__dirname,'src','index.jsx'),
    output :{
        path: path.resolve(__dirname,'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
          }
        ]
      }
}