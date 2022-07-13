import {firstData,secondData} from "./marketdata.js"
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstData, //初始数据
    secondData, 
    swiperData:[],
    goodslistData: [],
    value: '',
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('搜索1',this.data.value);
    wx.navigateTo({
      url: '../searchGoods/searchGoods?value='+this.data.value,
  })
  },
  onClick() {
    console.log('搜索2',this.data.value);
    wx.navigateTo({
      url: '../searchGoods/searchGoods?value='+this.data.value,
  })
  },

  //更改json键名
  changeJsonKey: function (res){
    return res.map(function(item){
        return {
            cat_icon: (app.globalData.host + item.goodsPicture.slice(1)).replaceAll("\\","/"),
            goods_name: item.goodsName,
            goods_describe:item.goodsDescribe,
            cat_id: item.goodsId,
            goods_price:item.goodsPrice
        }
    });
},
//加载商品
loadGoods: function (res){
    // 更改json键名 
    console.log(res);
    
    this.setData({
      goodslistData:this.changeJsonKey(res['data']),
    })
    
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  // Navigate
  call.postRequest("api/mall/type?type=蔬菜豆制品",{'page':1},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,0)
    let newArray1 = this.data.firstData;
    let newArray2 = this.data.secondData;
    this.setData({
      swiperData:newArray1,
      guideData:newArray2
    })
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