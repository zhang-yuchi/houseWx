var app = getApp();
Page({
  data: {
    userInfo: {},
    code: '',
    authShow: "block",
    loginShow: "none"
  },
  onLoad: function () {
    var that = this;
    var token = wx.getStorageSync('token');
    // if (token) {
    //   //用户已有登录态，检查token是否过期，过期重新登录
    //       wx.request({
    //         url: app.data.requestHost + '/tokenCheck',
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/json',
    //         },
    //         data: {token:token},
    //         success: res => {
    //           console.log(res.data);
    //           if (res.data.data == "token未过期" && res.data.status== "200"){
    //             wx.reLaunch({
    //               url: '../index/index',
    //             })
    //           }else{

    //           }
    //         },
    //         fail: res => {
    //           console.log("failed");
    //         }
    //       })
    // } else {
    //   // 用户未登录,啥都不做，留在本页面进行微信授权登录
      
    // }
  },

  // 点击按钮授权
  getUserInfo: function (e) {
    var that = this;
    that.setData({
      userInfo: e.detail.userInfo,
      authShow: "none",
      loginShow: "block",
    })
    app.data.userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', e.detail.userInfo)
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log(111)
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      }
    })  
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },

  // 登陆
  login: function () {
    var that = this;
    console.log(111)
    wx.switchTab({
      url: '../index/index',
    })
    // wx.login({
    //   success: res => {
    //     var code = res.code;
    //     var data = {
    //       userInfo: that.data.userInfo,
    //       code: code
    //     }
    //     wx.request({
    //       url: app.data.requestHost + '/wxLogin',
    //       method: 'POST',
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded',
    //       },
    //       data: data,
    //       success: res => {
    //         console.log(res.data);
    //         if(res.data.status == "200" && res.data.code == "1"){
    //           app.data.isLogin = true;
    //           wx.setStorageSync('token', res.data.data.userToken);
    //           wx.setStorageSync('id', res.data.data.id);
    //           wx.setStorageSync('isFd', res.data.data.isFd);
    //           wx.reLaunch({
    //             url: '../index/index',
    //           })
    //         }
    //       },
    //       fail: res => {
    //         wx.showModal({
    //           title: '登陆失败',
    //           content: '请重试!',
    //           showCancel: false,
    //           confirmColor: '#f95a70',
    //         })
    //       }
    //     })
    //   }
    // })
    
    
  },

  // 获取code
  getCode: function () {
    var that = this;
    wx.login({
      success: res => {
        console.log(res.code);
        that.setData({
          code: res.code
        })
      }
    })
  }

})