//app.js
App({
  data: {
    // requestHost: "https://lbwl.wingstudio.org",
    requestHost: "https://nadev.xyz/house",
    isLogin: false,
    isBusiness: false,
    currentEmail: "",
    width: 0,
    height: 0,
    currentEmailCoinCount: "",
    userInfo: {},
    openId: "",
    mapKey: 'OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE'
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
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        width = res.windowWidth;
        height = res.windowHeight;
      }

    });
    this.data.width = width;
    this.data.height = height;
  },
});