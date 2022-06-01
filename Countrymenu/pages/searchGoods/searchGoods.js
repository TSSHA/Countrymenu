const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsListData: [],
    triggered: false,
    activeKey: 0,
    

  },
  //更改json键名
  changeJsonKey: function (res){
    return res.map(function(item){
        return {
            cat_icon: (app.globalData.host + item.goodsPicture.slice(1)).replaceAll("\\","/"),
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
  // if(res['data'].length<8)
  // {
  //    this.data.done=true;
  // }
  this.setData({
    goodsListData: this.changeJsonKey(res['data']),
  })
  // this.setData({
  //   stopPull:false,
  // })
  // this.setData({
  //   loadinghidden:true,
  // })
  // this.goTop();
  // console.log("gotop")
  
},

  onChange(event) {
    this.setData({
      activeKey:event.detail
    })
    this.changeData(event.detail);
  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    call.postRequest("api/mall/search?find="+data.value,{'page':'1'},"application/x-www-form-urlencoded",
      this.loadGoods,console.log,0)
    
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

