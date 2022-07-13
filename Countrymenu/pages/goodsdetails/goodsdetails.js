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
    coll:"收藏",
    goodsid:"",
  },

  changeJsonKey_Specific: function (res){
    let a = [];
    a.push(res)
        return a.map(function(item){
            return {
                cat_name: item.goodsName,
                goods_describe:item.goodsDescribe,
                cat_icon: item.goodsPicture.split("|").map(function(res){
                     return app.globalData.host + res.slice(1).replaceAll("\\","/")
                 }),
                place:item.goodsPlace,
                price:item.goodsPrice,
            }
        });
    },

//加载具体菜谱

loadSpecificGoods: function (res){
    let that = this

    console.log(res)
    // 更改json键名 
    console.log(that.changeJsonKey_Specific(res['data']))
    that.setData({
        goodsData: that.changeJsonKey_Specific(res['data'])[0],
    })
},

collectproduct: function (){
  let token=wx.getStorageSync('token');
  if(this.data.coll=="已收藏"){
    call.postRequest("api/collection/delete?type=mall",{'token':token,'id':this.data.goodsid},"application/x-www-form-urlencoded",console.log,console.log);
    this.setData({
       coll: '收藏',
     })
}
  else if(this.data.coll=="收藏"){
     call.postRequest("api/collection/insert?itemtype=mall",{'itemid':this.data.goodsid,'token':token},"application/x-www-form-urlencoded",console.log,console.log);
  this.setData({
     coll: '已收藏',
   })
  }
},
getIfCollect: function (res){
  console.log(res.data);
    if(res.data=="该收藏不存在"){
        this.setData({
          coll: '收藏',
        })
    }
    else if(res.data=="该收藏存在"){
      this.setData({
        coll: '已收藏',
      })
  }
},


/**
* 生命周期函数--监听页面加载
*/
onLoad: function (data) {
      console.log(data);
      this.setData({
         goodsid: data.goodsid,
       })
      let token=wx.getStorageSync('token');
      call.postRequest("api/collection/exist?type=mall",{'token':token,'id':data.goodsid},"application/x-www-form-urlencoded",this.getIfCollect,console.log);

      //注意这里的id是对应的id，data数据中应该有一个
      call.postRequest("api/mall/"+data.goodsid,{},"application/x-www-form-urlencoded",
      this.loadSpecificGoods,console.log)
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