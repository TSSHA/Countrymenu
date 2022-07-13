// app.js
App({
  
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //  wx.request({
    //           //项目的真正接口，通过字符串拼接方式实现
    //           url: this.globalData.host + "getappsecret",
    //           method: 'GET',
    //           success: function (res) {
    //               //参数值为res.data,直接将返回的数据传入
    //               app.globalData.AppSecret=res.data.appsecret;
    //           },
    //           fail: function () {
    //           },
    //       })
    
    // 登录
    wx.login({
      success: res => {
       // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        console.log("code",res.code)
        console.log(res)
        wx.request({
          url: 'https://orall.top/recipe/api/getinfo/login',
          data: {
            code:res.code,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("res",res);
            let setNowTime = Date.now() + 3600 * 1000 * 24 * 30;  // 设置了30天有效期
            wx.setStorageSync('token',res.data.data.token, setNowTime)
          }
        })
        // // 设置appid
        // const appId = "wx023e3a4297441859";
        // // const appid = res.appid;
        // //设置secret
        // const secret = this.globalData.s+this.globalData.d;
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId  + '&secret=' + secret  + '&js_code=' + code + '&grant_type=authorization_code',
        //   data: {},
        //   header: {
        //     'content-type': 'json'
        //   },
        //   success: function (res) {
        //     const openId = res.data.openid; //返回openid
        //     console.log(openId);
        //   }
        // })
      }
    })
    
  },
  
  globalData: {
    userInfo: null,
    host: 'https://orall.top/recipe/',
    openId:'',
    s:'e7056611f6888df',
    d:'d25745ff9b9dae882'
  }
})
