import {firstCategory} from "../mcates/mcatesdata.js"
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstCategory,
    goodsListData: [],
    activeKey: 0,
    triggered: false,
    stopPull:false,
    index2:1,
    topNum:0,
    loadinghidden:false,
    done:false,
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0
    });
  },

  //更改json键名
  changeJsonKey: function (res){
    return res.map(function(item){
        return {
            cat_icon: (app.globalData.host + item.goodsPicture.slice(1)).replace("\\","/"),
            goods_name: item.goodsName,
            goods_describe:item.goodsDescribe,
            cat_id: item.goodsId,
        }
    });
},
//加载商品
loadGoods: function (res){
    // 更改json键名 
    console.log(res);
    if(res['data'].length==0)
    {
       return;
    }
    if(res['data'].length<8)
    {
       this.data.done=true;
    }
    this.setData({
      goodsListData: this.changeJsonKey(res['data']),
    })
    this.setData({
      stopPull:false,
    })
    this.setData({
      loadinghidden:true,
    })
    this.goTop();
    console.log("gotop")
    
},

  onChange(event) {
    this.setData({
      activeKey:event.detail
    })
    this.changeData(event.detail);
  },


  changeData(index1){
    this.data.index2=1;
    this.data.done=false;
    if(index1==0){
      call.postRequest("api/mall/type?type=蔬菜豆制品",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,0)
    }
    else if(index1==1){
      call.postRequest("api/mall/type?type=肉禽蛋",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,1)
    }
    else if(index1==2){
      call.postRequest("api/mall/type?type=海鲜水产",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,2)
    }
    else if(index1==3){
      call.postRequest("api/mall/type?type=水果鲜花",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,3)
    }
    else if(index1==4){
      call.postRequest("api/mall/type?type=乳品",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,4)
    }
    else if(index1==5){
      call.postRequest("api/mall/type?type=粮油调味",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,5)
    }
    else if(index1==6){
      call.postRequest("api/mall/type?type=酒水饮料",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,6)
    }
    else if(index1==7){
      call.postRequest("api/mall/type?type=熟食预制菜",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,7)
    }
    else {
      call.postRequest("api/mall/type?type=蔬菜豆制品",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,0)
    }

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    this.setData({
      activeKey:data.pageData
    })
    
  },
  onPullDown(e) {
    console.log("onPullDown", e);
    if(this.data.index2<=1)
      {
        return;
      }
    this.data.index2--;
    call.postRequest("api/recipes/type?type=日常菜谱",{'page':this.data.index2},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,0)
  },

  onPullUp(e) {
    if(this.data.done==true)
    {

      return;
    }
    if (this.data.stopPull) {
       wx.stopPullDownRefresh()
    }
    else{
      this.data.stopPull=true;
      console.log("onPullUp", e);
      this.data.index2++;
      this.setData({
        loadinghidden:false,
      })
      call.postRequest("api/recipes/type?type=日常菜谱",{'page':this.data.index2},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,0)
    }
  },

  //用户下拉动作
  onScrollRefresh: function () {
    var that=this;
    setTimeout(function(){
      that.setData({
        triggered: false,
      })
    },1000);
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    //初始化页面
    this.setData({
      activeKey:data.pageData
    })
    this.changeData(data.pageData);
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

  
})

