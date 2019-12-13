//app.js
App({
  data: {
    // requestHost: "https://lbwl.wingstudio.org",
    requestHost: "http://45.40.193.214:3000",
    isLogin: false,
    isBusiness: false,
    currentEmail: "",
    width: 0,
    height: 0,
    currentEmailCoinCount: "",
    userInfo: {},
    openId: ""
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    var width = 0;
    var height = 0;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        width = res.windowWidth;
        height = res.windowHeight;
      }

    });
    this.data.width = width;
    this.data.height = height;
  },
});