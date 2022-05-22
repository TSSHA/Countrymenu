const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuListData: [],
    triggered: false,
    stopPull:false,
    index2:1,
    topNum:0,
    loadinghidden:false,
    done:false,
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

     //回到顶部
    goTop: function (e) {  // 一键回到顶部
      this.setData({
         topNum: this.data.topNum = 0
     });
     },
    //加载菜谱
    loadRecipe: function (res,index){
        // 更改json键名 
        if(res['data'].length==0)
        {
           return;
        }
        // if(res['data'].length<8)
        // {
        //    this.data.done=true;
        // }
        this.setData({
          menuListData: this.changeJsonKey(res['data']),
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

  onPullDown(e) {
    console.log("onPullDown", e);
    // if(this.data.index2<=1)
    //   {
    //     return;
    //   }
    // this.data.index2--;

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
  onLoad: function (data) {
    call.postRequest("api/recipes/search?find="+data.value,{'page':'1'},"application/x-www-form-urlencoded",
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

