> 参考 : 课程地址：https://www.imooc.com/learn/935
   npm入门:https://www.jianshu.com/p/7752101b4ab2
   课程完整文档:https://cloud.tencent.com/developer/article/1185860（由于本文主要学习webpack结合vue，所以只完成其中的部分）   


# 一. 课程目标
* 实践vue前端工程的搭建，和前端工程化组件化的意义
* 学会结合vue使用webpack，npm
* 优化前端工程配置，达到上线目标

# 二.开发工具VSCode
##  2.1插件安装
安装一些插件和配置IDE（好多我暂时也不知道是做什么的，先列出）
   * Vetur   ：vue插件，语法提示
   * EditorConfig for VS Code
   * ESLint
   * gitignore ：   git文件忽略相关插件
   * language-stylus
   * Nunjucks
   * One Dark Pro
   * PostCSS syntax
   * View In Browser
   * vscode-icons  文件都能以图标修饰，十分清晰明了，易于查看！
## 2.2 软件配置
```
{
    "window.zoomLevel": 2,
    "editor.fontSize": 20,
    "workbench.iconTheme": "vscode-icons",
    "files.autoSave": "onFocusChange",
    "terminal.integrated.fontSize": 20,
    "editor.tabSize": 2
}
```
# 三.helloworld
## 3.1 项目初始化
快捷键 ctrl + ` 打开终端命令行，npm init，项目目录下产生一个新的文件package.json
> 理解package.json，参考:http://javascript.ruanyifeng.com/nodejs/packagejson.html

安装必要的js依赖
```
npm i webpack@^3.10.0 vue vue-loader@^13.6.0
npm i css-loader@^1.0.0 vue-template-compiler   style-loader@0.23.1
npm i url-loader file-loader  stylus-loader stylus
```

> 注意： （如果使用如下版本也可以，这里参考老师课程，不给自己增加额外学习负担)
A.webpack需要安装到4版本以下

B.vue-loader需要安装15版本以下（参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required . Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的）

C. vue和vue-template-compiler版本要一致



## 3.2 webpack + npm进行vue项目构建的基本配置

新建一个src目录存放源代码，新建一个app.vue，下面是一个.vue文件的基本格式

```

<template>
    <div id="test">{{text}}</div>
</template>

<script>
export default {
    data(){
        return{
            text:'abc'
        }
    }
}
</script>

<style>
#test{color: red}
</style>
```



新建一个index.js，该文件作为前端项目的入口

```

import Vue from 'vue'

import App from './app.vue'

// 将app.vue定义的组件引入，并取名为App



const root = document.createElement('div')

document.body.appendChild(root)



new Vue({

  render:(h) => h(App)   //渲染App组件

}).$mount(root)              //挂载到页面的root-div

```

定义webpack.config.js，项目打包配置

```

const path = require('path')



module.exports = {

    entry:path.join(__dirname,'src/index.js'), //定义前端项目入口

    output:{

        filename:'bundle.js', //定义打包之后的文件名

        path:path.join(__dirname,'dist') //定义打包之后的文件路径

    },

    module:{

        rules: [

            {

              test: /\.vue$/,

              loader: 'vue-loader'  //配置vue文件编译器

            }

        ]

    }

}

```

package.json增加配置build脚本

```

...

"scripts": {

   ...

    "build": "webpack --config webpack.config.js"

  },

...

```



终端窗口运行`npm run build`，build结果如dist/bundle.js



## 3.3 前端项目引入静态文件
一个vue项目不仅有.vue文件，还可能有css文件，图片文件，stylus文件等，所以需要针对这些文件定义编译器
```
module: {
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
```


## 3.4  引入 webpack-dev-server，用于开发程序调试
### 3.4.1 安装
```
npm i webpack-dev-server@^2.9.7
```
> 这个版本应该与webpack版本相互兼容，3.1.5版本会报错，推测要在3以下

### 3.4.2 跨平台的环境设置先执行```npm i cross-env```，然后在package.json的test，build，dev脚本配置
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  },
```
> 不同的操作系统设置变量的命令是不一致的，为了跨平台通用性，引入cross-env

### 3.4.3 开发环境拆分，避免webpack-dev-server对生产环境构建产生影响



### 3.4.4 webpack-html插件，作为jsweb项目的载体
```
npm i html-webpack-plugin
```




使用插件，在js中可以直接引用环境判断，vue可以根据不同环境打包，开发环境会有很多错误提示，但是正式环境不需要



### 3.4.5  见证奇迹的时刻
```
npm run dev
```

加入一些静态元素，测试3.3小节是否生效
index.js
```
...
import '../assets/styles/index.css'

const root = document.createElement('div')
...
```

index.css
```
body{
    color: red;
    background-image: url('../images/bg.png')
}
```





