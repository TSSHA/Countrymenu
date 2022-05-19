import {firstCategory} from "./ccatesdata.js"
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstCategory,
    menuListData: [],
    activeKey: 0,
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
        console.log("res",res)
        console.log(this.changeJsonKey(res['data']))
        // var up = 'forthData['+index+'].children'
        this.setData({
          menuListData: this.changeJsonKey(res['data']),
        })
        
    },
  onChange(event) {
    this.setData({
      activeKey:event.detail
    })
    this.changeData(event.detail);
  },

  changeData(index){
    if(index==0){
      call.postRequest("api/recipes/type?type=日常菜谱",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,0)
    }
    else if(index==1){
      call.postRequest("api/recipes/type?type=文化菜谱",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,1)
    }
    else if(index==2){
      call.postRequest("api/recipes/type?type=自制菜谱",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,2)
    }
    else if(index==3){
      call.postRequest("api/recipes/type?type=功能菜谱",{'page':'1'},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,3)
    }

    
  },

  onPullDown(e) {
    console.log("onPullDown", e);
    let callback = e.detail.callback;
    this.getList().then(res => {
      callback(res) // 成功回调
    }).catch(res => {
      callback([]) // 请求失败也要执行回调关闭加载效果
    })

  },

  onPullUp(e) {
    console.log("onPullUp", e);
    let callback = e.detail.callback;
    this.getList().then(res => {
      callback(res) // 成功回调
    }).catch(res => {
      callback([]) // 请求失败也要执行回调关闭加载效果
    })

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

