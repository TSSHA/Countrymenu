// pages/menudetails/menudetails.js
import {forthData} from "./goodsdetailsdata"
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forthData,
    goodsData: [],
  },

  changeJsonKey_Specific: function (res){
    let a = [];
    a.push(res)
        return a.map(function(item){
            return {
                cat_name: item.goodsName,
                goods_describe:item.goodsDescribe,
                cat_icon: item.goodsPicture.split("|").map(function(res){
                     return app.globalData.host + res.slice(1).replace("\\","/")
                 }),
                place:item.goodsPlace,
                price:item.goodsPrice,
            }
        });
    },

//加载具体菜谱

loadSpecificRecipe: function (res){
    let that = this

    console.log(res)
    // 更改json键名 
    console.log(that.changeJsonKey_Specific(res['data']))
    that.setData({
        goodsData: that.changeJsonKey_Specific(res['data'])[0],
    })
},


/**
* 生命周期函数--监听页面加载
*/
onLoad: function (data) {
      console.log(data);
      //注意这里的id是对应的id，data数据中应该有一个
      call.postRequest("api/mall/"+data.goodsid,{},"application/x-www-form-urlencoded",
      this.loadSpecificRecipe,console.log)
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})