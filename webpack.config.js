const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
    target:'web',
    entry:path.join(__dirname,'src/index.js'),  //定义前端项目入口
    output:{
        filename:'bundle.js',   //定义打包之后的文件名
        path:path.join(__dirname,'dist')   //定义打包之后的文件路径
    },
    module:{
        rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            },
            {
              test: /\.styl/,
              use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
              ]
            },
      
            {
              test: /\.(gif|jpg|jepg|png|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 1024,
                    name: '[name]-aaa.[ext]'
                  }
                }
              ]
            }
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
        }
      }),
      new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool = '#cheap-module-eval-source-map' // 浏览器打开后，通过映射以编译后我们能看懂方式调整，source-map最完整映射关系，但是编译效率比较低，文件比较大，eval可能看起来会比较乱，出现行对应不齐的问题。而推荐的这个效率比较高
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true // 改了一个组件的代码，只重新渲染这个组件，不贵整个页面渲染
        // historyFallback: {

        // }// 入口地址映射，(略)
        // open: true //启动后自动打开页面
    }

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin() // 不需要信息展示的问题
    )
}


module.exports =  config;