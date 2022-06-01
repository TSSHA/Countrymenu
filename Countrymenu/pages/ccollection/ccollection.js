const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuListData: [],
    triggered: false,
  },
  //更改json键名
    changeJsonKey: function (res){
        return res.map(function(item){
            return {
                cat_id: item.id,
                goods_name: item.dishes,
                goods_describe:item.describes,
                cat_icon: (app.globalData.host + item.picture.slice(1)).replaceAll("\\","/")
            }
        });
    },
    //加载菜谱
    loadRecipe: function (res,index){
        // 更改json键名 
        // var up = 'forthData['+index+'].children'
        console.log(res);
        this.setData({
          menuListData: this.changeJsonKey(res['data']),
        })
        
    },

    deleteMenu:function(e){
    var that=this;
     console.log(e.target.dataset.menuid);
     let token=wx.getStorageSync('token');
     call.postRequest("api/collection/delete?type=recipe",{'token':token,'id':e.target.dataset.menuid},"application/x-www-form-urlencoded",this.deleteMenu2,console.log);
   },

    deleteMenu2:function(res){
      console.log(res);
      let token=wx.getStorageSync('token');
      call.postRequest("api/collection/type?type=recipe",{'token':token},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log)
   },

  onPullDown(e) {
    console.log("onPullDown", e);
  },

  onPullUp(e) {
    console.log("onPullUp", e);
  },

  //用户下拉动作
  onScrollRefresh: function () {
    var that=this;
    setTimeout(function(){
      that.setData({
        triggered: false,
      })
    },2000);
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token=wx.getStorageSync('token');
    call.postRequest("api/collection/type?type=recipe",{'token':token},"application/x-www-form-urlencoded",
    this.loadRecipe,console.log)
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

