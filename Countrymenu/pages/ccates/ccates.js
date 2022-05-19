import {forthData} from "./ccatesdata.js"
const call = require("../../utils/request")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forthData,
    goodsData: [],
    activeKey: 0,
    mainActiveIndex: 0,
    activeId: null,
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
        let that = this
        //console.log(res)
        // 更改json键名 
        console.log(that.changeJsonKey(res['data']))

    
        var up = 'forthData['+index+'].children'
        that.setData({
            [up]: that.changeJsonKey(res['data']),
        })
        
    },
  onChange(event) {
    this.setData({
      activeKey:event.detail
    })
    this.initialData(event.detail);
  },

  initialData(firstIndex){
    let allData = this.data.goodsData
    let firstCategory = []
    allData.forEach((value, index, array) => {
      firstCategory.push(value)
    })
    let targetedFirstData = allData[firstIndex]
    let secondCategory = []
    targetedFirstData.children.forEach((value, index, array) => {
      secondCategory.push(value)
    })
    this.setData({
      firstCategory,
      secondCategory
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let newArray4 = this.data.forthData;
    this.setData({
      goodsData:newArray4
    })
    call.postRequest2("api/recipes/type?type=日常菜谱",{'page':'1'},"application/x-www-form-urlencoded",
    this.loadRecipe,console.log,0)
    call.postRequest2("api/recipes/type?type=文化菜谱",{'page':'1'},"application/x-www-form-urlencoded",
    this.loadRecipe,console.log,1)
    call.postRequest2("api/recipes/type?type=自制菜谱",{'page':'1'},"application/x-www-form-urlencoded",
    this.loadRecipe,console.log,2)
    call.postRequest2("api/recipes/type?type=功能菜谱",{'page':'1'},"application/x-www-form-urlencoded",
    this.loadRecipe,console.log,3)
  

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
  
    this.initialData(0,0)
  },

  
})

