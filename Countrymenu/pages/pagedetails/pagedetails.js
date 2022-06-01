// pages/pagedetails/pagedetails.js
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pagedata:[],
  },

  changeJsonKey_Specific: function (res){
    let a = [];
    a.push(res);
        return a.map(function(item){
            return {
                page_title:item.title,
                // page_pic: app.globalData.host + item.picture.slice(1).replace("\\","/"),
                page_pic: item.picture.split("|").map(function(res){
                     return app.globalData.host + res.slice(1).replaceAll("\\","/")
                 }),
                page_id:item.id,
                page_body:item.body.split('|')
            }
        });
    },

  getpages:function (res){
    let that = this;
    console.log(that.changeJsonKey_Specific(res['data'])[0]);
    that.setData({
      pagedata: that.changeJsonKey_Specific(res['data'])[0]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(data) {
    call.postRequest("api/museums/"+data.pagedata,{},"application/x-www-form-urlencoded",this.getpages,console.log);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})