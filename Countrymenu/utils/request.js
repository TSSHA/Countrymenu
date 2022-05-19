var app = getApp();
//项目URL相同部分，减轻代码量，同时方便项目迁移
// 填写host：在app.js中设置为全局变量，有利于更改
var host = app.globalData.host;

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * headType：参数，string类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function postRequest(url, postData, headType,doSuccess, doFail) {
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: host + url,
        header: {
            "content-type" : headType,
        },
        data: postData,
        method: 'POST',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * headType：参数，string类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 * data 要修改的数据
 */
function postRequest2(url, postData, headType,doSuccess, doFail,data) {
  wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: host + url,
      header: {
          "content-type" : headType,
      },
      data: postData,
      method: 'POST',
      success: function (res) {
          //参数值为res.data,直接将返回的数据传入
          doSuccess(res.data,data);
      },
      fail: function () {
          doFail();
      },
  })
}

//GET请求，不需传参，直接URL调用，
function getRequest(url, doSuccess, doFail) {
    wx.request({
        url: host + url,
        method: 'GET',
        success: function (res) {
            doSuccess(res.data);
        },
        fail: function (res) {
            doFail();
        },
    })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js") 加载
 * 在引入引入文件的时候" "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 * module要与函数名相对应
 */
module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.postRequest2 = postRequest2;
