# H5MusicPlayer

	
**技术栈**

gulp打包、html5（audio、requestAnimationFrame）、less、zepto

**五个模块**

```
render.js
audioControl.js
controlManage.js
process.js
playList.js
```
每个模块都参照jqery的封装样式，封装在立即执行函数中，将zepto，以及window上的player对象传入。每个模块的暴露在player对象上。

**模块功能**

##### render.js 渲染页面结构

	renderImg-渲染专辑图片、渲染背景图片
  
	renderInfo-渲染歌曲名、姓名、专辑名
  
	renderIsLike-渲染歌曲是否喜欢
  
##### audioControl.js 控制音频

	 构造函数。构造new Audio（），记录当前的状态是播放还是暂停
  
	 原型上的方法：获取audio地址、play、pause、goto-跳转播放、监听end事件
  
##### controlManage.js 获取播放歌曲的索引值
  
    构造函数。保存当前索引值，歌曲列表的长度
  
    原型上的方法：获取上一首歌曲的索引，获取下一首歌曲的索引。
  
##### process.js 控制播放进度的模块，导出一个对象。对象上有下列方法：

     renderAllTime函数，根据歌曲总时长，渲染页面的歌曲时间
  
     start函数，开始播放时就开始计时，通过requestAnimationFrame不断的获取播放时间，并执行update函数
  
     update函数，更新页面上的当前播放时间。更新进度条。
  
     stop函数，停止播放时，清除计时器，记录当前事件，以及播放的百分比。下次开始时在此基础上进行累加
  
##### playList.js 控制播放列表

      renderList函数，每次点击的时候，根据数据渲染列表。

      show函数，点击播放列表，显示列表信息，当前播放歌曲标红显示。
 
      bindEvent函数，点击播放列表上的歌曲，会自动进行播放

##### 项目体会

        在写一个项目之前，需要先确定好项目会使用到的技术，做好项目目录，以及用到的第三方依赖，这里我用的是xmind脑图来进行编写。
        代码的打包、去空格等机械化重复性的工作都交给自动化构建工具去完成。将注意力放在代码的编写上。自动化构建工具能提升开发效率和代码质量。
        
        模块化方式，让每一个模块功能更清晰，每一个模块都是一个立即执行函数，使变量私有化，避免污染全局变量，而且复用性很高，有更好的可维护性。
        gulp工具是基于nodejs，采用的是commonJs规范。使用require导入，module.exports导出模块。commonJs是nodeJs使用的规范，前端使用AMD规范，
        AMD的产物是require.js，使用define定义模块，reuire导入模块。CMD规范的产物是sea.js，结合commonJs和AMD, define定义模块，并将require，
        exports，module当形参传入函数中，使用module.exports导出。

      
  
  
  
