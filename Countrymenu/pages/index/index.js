// 0 引入 用来发送请求的方法
import {firstData,secondData,thirdData} from "./indexdata.js"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
// pages/search/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstData, //初始数据
    secondData, 
    thirdData, 
    swiperData:[],
    value: '',
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    wx.navigateTo({
      url: '../searchMenu/searchMenu?value='+this.data.value,
  })
  },
  onClick() {
    wx.navigateTo({
      url: '../searchMenu/searchMenu?value='+this.data.value,
  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let newArray1 = this.data.firstData;
    let newArray2 = this.data.secondData;
    this.setData({
      swiperData:newArray1,
      guideData:newArray2,
    })
  },

  

  
})