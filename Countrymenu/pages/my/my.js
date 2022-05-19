Page({
  data:{
    userInfo: {}
  },
  onLoad:function(e){
    this.setUserInfoStorageTime();
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
      success(res) {
        console.log(res)
      },
      fail(e) {
        console.log(e)
      }
    })
  },

/**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
        console.log(res.target)
    }
    return {
        title: '分享给好友',
        imageUrl: ''
    }
},


  getUserProfile() {
    var that = this;
    wx.showModal({
      title: "提示",
      content: "是否允许获取微信昵称和头像？",
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
            desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              that.setData({
                userInfo: res.userInfo
              });
              wx.setStorageSync("userInfo", res.userInfo);
              
              let setNowTime = Date.now() + 3600 * 1000 * 24 * 30;  // 设置了30天有效期
              wx.setStorageSync("userInfoStorageTime", setNowTime);
            },
            fail: function (err) {
              console.log(err);
            },
          });
        }
      },
    });
  },
  setUserInfoStorageTime() {
    var that = this;
    let nowTime = Date.now();
    let oldTime = wx.getStorageSync("userInfoStorageTime");
    let userInfo = wx.getStorageSync("userInfo");
    if ( userInfo.nickName != undefined && userInfo.nickName != null && userInfo.nickName != "" ) {
      if (oldTime && nowTime < oldTime) {
        that.setData({
          userInfo:userInfo
        })
        return;
      } else {
        that.getUserProfile();
      }
    } else {
      that.getUserProfile();
    }
  },
  
})
