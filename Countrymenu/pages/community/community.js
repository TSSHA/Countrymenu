import {firstData} from "./communitydata.js"
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstData, //初始数据
    listData: [],
    listData2: [],
    triggered: false,
    index2:1,
    loadinghidden:false,
    done:false,
    activeKey:0
  },

  // //回到顶部
  // goTop: function (e) {  // 一键回到顶部
  //   this.setData({
  //     topNum: this.data.topNum = 0
  //   });
  // },

  onChange(event) {
    this.setData({
      activeKey:event.detail.index
    })
    this.data.done=false
    this.data.index2=1;
  },

  changeJsonKey_Specific: function (res){
        return res.map(function(item){
            return {
                page_title:item.title,
                page_pic: (app.globalData.host + item.picture.slice(1)).replaceAll("\\","/"),
                page_id:item.id
            }
        });
    },

  getpages:function (res){
    let that = this;
    if(res['data'].length==0)
    {
      this.data.done=true;
       return;
    }
    if(res['data'].length<8)
    {
       this.data.done=true;
    }
    let allData = this.data.listData
    let pushData =  that.changeJsonKey_Specific(res['data'])
    pushData.forEach((value, index, array) => {
      allData.push(value)
    })
    this.setData({
      listData:allData,
    })
    this.setData({
      loadinghidden:true,
    })
    // this.goTop();
  },

  getpages2:function (res){
    let that = this;
    if(res['data'].length==0)
    {
      this.data.done=true;
       return;
    }
    if(res['data'].length<8)
    {
       this.data.done=true;
    }
    let allData2 = this.data.listData2
    let pushData2 = that.changeJsonKey_Specific(res['data'])
    pushData2.forEach((value, index, array) => {
      allData2.push(value)
    })
    this.setData({
      listData2:allData2,
    })
    this.setData({
      loadinghidden:true,
    })
    
  },

  loadPages1(index1){
    let index2=this.data.index2;
    this.data.done=false;
    call.postRequest("api/museums/",{'page':index2,'type':"助农故事"},"application/x-www-form-urlencoded",this.getpages,console.log);
  },

  loadPages2(index1){
    let index2=this.data.index2;
    this.data.done=false;
    call.postRequest("api/museums/",{'page':index2,'type':"美食文化"},"application/x-www-form-urlencoded",this.getpages2,console.log);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    call.postRequest("api/museums/type",{'page':1,'type':"助农故事"},"application/x-www-form-urlencoded",this.getpages,console.log);
    call.postRequest("api/museums/type",{'page':1,'type':"美食文化"},"application/x-www-form-urlencoded",this.getpages2,console.log);
  },

  onPullUp(e) {
    if(this.data.done==true)
    {
      return;
    }
    this.data.index2++;
    this.loadPages1(this.data.activeKey);

  },

  onPullUp2(e) {
    if(this.data.done==true)
    {
      return;
    }
    this.data.index2++;
    this.loadPages2(this.data.activeKey);

  },

  // //用户下拉动作
  // onScrollRefresh: function () {
  //   var that=this;
  //   setTimeout(function(){
  //     that.setData({
  //       triggered: false,
  //     })
  //   },1000);
  // },

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