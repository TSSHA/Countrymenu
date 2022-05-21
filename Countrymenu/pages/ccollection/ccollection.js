const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuListData: [],
    triggered: false,
    index2:1,
  },
  //更改json键名
    changeJsonKey: function (res){
        return res.map(function(item){
            return {
                cat_id: item.id,
                goods_name: item.dishes,
                goods_describe:item.describes,
                cat_icon: (app.globalData.host + item.picture.slice(1)).replace("\\","/")
            }
        });
    },
    //加载菜谱
    loadRecipe: function (res,index){
        // 更改json键名 
        // var up = 'forthData['+index+'].children'
        this.setData({
          menuListData: this.changeJsonKey(res['data']),
        })
        
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

    let newArray4 = this.data.forthData;
    call.postRequest("api/recipes/type?type=日常菜谱",{'page':'1'},"application/x-www-form-urlencoded",
    this.loadRecipe,console.log)
    this.setData({
      goodsData:newArray4
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

  
})

