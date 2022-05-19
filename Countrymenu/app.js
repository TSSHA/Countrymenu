// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({

      success: res => {

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        // 设置appid
        const appId = "wx023e3a4297441859";
        // const appid = res.appid;
        //设置secret
        const secret = "e7056611f6888dfd25745ff9b9dae882";
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId  + '&secret=' + secret  + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            const openId = res.data.openid; //返回openid
            console.log(openId);
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    host: 'https://orall.top/recipe/',
  }
})
