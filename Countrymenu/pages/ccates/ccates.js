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
    triggered: false,
    // stopPull:false,
    index2:1,
    topNum:0,
    loadinghidden:false,
    done:false,
    donehidden:true,
    tips:"--加载中--"
  },

  //  // 获取滚动条当前位置
  //  scrolltoupper:function(e){
  //   console.log(e)
  //   let t =  e.detail.scrollTop;
  //   if (t > 100 && !this.data.floorstatus) {
  //     // 避免重复setData
  //     this.setData({
  //        floorstatus: true
  //     });
  //   } 

  //   if(t <= 100 && this.data.floorstatus){
  //     this.setData({
  //       floorstatus: false
  //     });
  //   }
  // },

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
        if(res['data'].length==0)
        {
          this.data.done=true;
          this.data.tips="--没有更多了--";
           return;
        }
        if(res['data'].length<8)
        {
           this.data.done=true;
           this.data.tips="--没有更多了--";
        }
        let allData = this.data.menuListData
         console.log(allData)
        let pushData = this.changeJsonKey(res['data'])
        console.log(pushData)
        pushData.forEach((value, index, array) => {
         allData.push(value)
       })
        this.setData({
          menuListData: allData,
       })
        
        this.setData({
          loadinghidden:true,
        })
        // this.goTop();
        // console.log("gotop")
        
    },

    //换分类加载
    loadRecipe2: function (res,index){
      // 更改json键名 
      // var up = 'forthData['+index+'].children'
      if(res['data'].length==0)
      {
        this.data.done=true;
         return;
      }
      if(res['data'].length<8)
      {
         this.data.done=true;
      }
      
      this.setData({
        menuListData: this.changeJsonKey(res['data']),
      })
      
      this.setData({
        loadinghidden:true,
      })
      this.goTop();
      // console.log("gotop")
      
  },


    /**
   * 页面上拉触底事件的处理函数
   */
    
  onChange(event) {
    this.setData({
      activeKey:event.detail
    })
    this.changeData(event.detail);
    this.data.index2=1;
  },

  changeData(index1){
    this.data.tips="--加载中--";
    let index2=this.data.index2;
    this.data.done=false;
    if(index1==0){
      call.postRequest("api/recipes/type?type=日常菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe2,console.log,0)
    }
    else if(index1==1){
      call.postRequest("api/recipes/type?type=文化菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe2,console.log,1)
    }
    else if(index1==2){
      call.postRequest("api/recipes/type?type=自制菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe2,console.log,2)
    }
    else if(index1==3){
      call.postRequest("api/recipes/type?type=功能菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe2,console.log,3)
    }

    
  },

  loadData(index1){
    let index2=this.data.index2;
    if(index1==0){
      call.postRequest("api/recipes/type?type=日常菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,0)
    }
    else if(index1==1){
      call.postRequest("api/recipes/type?type=文化菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,1)
    }
    else if(index1==2){
      call.postRequest("api/recipes/type?type=自制菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,2)
    }
    else if(index1==3){
      call.postRequest("api/recipes/type?type=功能菜谱",{'page':index2},"application/x-www-form-urlencoded",
      this.loadRecipe,console.log,3)
    }

    
  },

  onPullDown(e) {
    // console.log("onPullDown", e);
    // if(this.data.index2<=1)
    //   {
    //     return;
    //   }
    // this.data.index2--;
    // this.changeData(this.data.activeKey);
  },

  onPullUp(e) {
    if(this.data.done==true)
    {
      return;
    }
    // if (this.data.stopPull) {
    //    wx.stopPullDownRefresh()
    // }
    // else{
    //   this.data.stopPull=true;
    //   console.log("onPullUp", e);
    //   this.data.index2++;
    //   this.setData({
    //     loadinghidden:false,
    //   })
    //   this.changeData(this.data.activeKey);
    // }
    this.data.index2++;
    this.loadData(this.data.activeKey);
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
    if(this.data.done==true)
    {
      this.data.tips="--没有更多了--";
    }
    else{
      this.data.tips="--加载中--";
    }
    
  },

  
})

