// pages/menudetails/menudetails.js
import {forthData} from "./menudetailsdata"
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forthData,
    menuData: [],
    coll:"收藏",
  },

  changeJsonKey_Specific: function (res){
            let a = [];
            a.push(res)
            return a.map(function(item){
                return {
                    cat_id: item.id,
                    cat_name: item.dishes,
                    goods_describe:item.describes,
                    cat_icon: (app.globalData.host + item.picture.slice(1)).replace("\\","/"),
                    regional:item.regional,
                    culture_desc:item.culture,
                    efficacy:item.efficacy,
                    cailiao:item.materials.split('|'),
                    buzhou:item.practice.split('|'),
                }
            });
        },

    //加载具体菜谱

    loadSpecificRecipe: function (res){
          let that = this

          that.setData({
              menuData: that.changeJsonKey_Specific(res['data'])[0],
          })
    },
    
    shoucangproduct: function (res){
          
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    console.log(data);
    //注意这里的id是对应的id，data数据中应该有一个
    call.postRequest("api/recipes/"+data.menuid,{},"application/x-www-form-urlencoded",
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