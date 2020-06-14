// pages/middle_mime/middle_mime.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    concatBox_sonBoxwidth: "",
    concatBoxDisplay: "none",
    nickName: "",
    imagePic: "",
    isFd: 0,
    lock: false,
    notifyShowen: false,
    cleanShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 登陆
    var that = this;
    new Promise((resolve) => {
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: "/pages/wxLogin/wxLogin?status=null&mine=true",
        })
        return
      }
      app.ajaxMethod(`/user/token/${token}`).then(res => {
        let tokenStatus = res.data.status
        return new Promise((resolve, reject) => {
          if (tokenStatus == 1) {
            reject(tokenStatus)//验证成功,不进行操作
          } else {
            resolve(tokenStatus)
          }
        })
      })
        .then(tokenStatus => {
          //验证过期,需要重新登录
          wx.navigateTo({
            url: "/pages/wxLogin/wxLogin?status=expired&mine=true"
          })
        })
        .catch(success => {
          resolve(success)
        })
    })

    
    if (wx.getStorageSync('userInfo')) {
      let userInfo = wx.getStorageSync('userInfo');
      let isFd = userInfo.landlord;
      let authImg = wx.getStorageSync("authImg")
      that.setData({
        nickName: userInfo.nickName,
        imagePic: authImg,
        isFd: isFd
      })
    }
  },
  tosurf: function() {
    wx.navigateTo({
      url: '../mysurf/mysurf',
    })
  },
  tomysc: function() {
    wx.navigateTo({
      url: '../mysc/mysc',
    })
  },
  call: function() {
    wx.makePhoneCall({
      phoneNumber: '020-202525562' //仅为示例，并非真实的电话号码
    })
  },
  showConcatBox: function() {
    this.setData({
      concatBoxDisplay: "block"
    })
  },
  cancel: function() {
    this.setData({
      concatBoxDisplay: "none"
    })
  },
  preClean: function() {
    this.setData({
      cleanShow: true
    })
  },
  cancelClean: function() {
    this.setData({
      cleanShow: false
    })
  },
  callClean: function() {
    wx.makePhoneCall({
      phoneNumber: '020-202525562' //仅为示例，并非真实的电话号码
    })
  },
  tomyorder: function() {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  tomyfixed: function() {
    wx.navigateTo({
      url: '../myfixed/myfixed',
    })
  },
  tosc: function() {
    wx.navigateTo({
      url: '../sc/sc',
    })
  },
  tomyordercash: function() {
    wx.navigateTo({
      url: '../myordercash/myordercash',
    })
  },
  fdauth() {
    if (this.data.isFd == 0) {
      wx.navigateTo({
        url: '../usertofd/usertofd',
      })
    } else {
      wx.showToast({
        title: '审核中,请耐心等待',
        icon: "none"
      })
    }

  },
  tomyhouse_fd: function() {
    wx.navigateTo({
      url: '../myhouse_fd/myhouse_fd',
    })
  },
  tomywallet: function() {
    wx.navigateTo({
      url: '../mywallet_fd/mywallet_fd',
    })
  },
  toQuanxian: function() {
    wx.getSetting({
      success(res) {
        // console.log(res.authSetting)
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '提示',
            content: '请求获取位置权限',
            success: function(res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function(data) {
                    if (data.authSetting['scope.userLocation'] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '您已授权成功',
            icon: 'none',
            duration: 1000
          })
          return false
        }
      }
    })
  },

  toChangeInfodetails: function() {
    wx.navigateTo({
      url: '../change_infodetails/change_infodetails',
    })
  },
  toFix() {
    wx.navigateTo({
      url: '../myfixed/myfixed',
    })
  },
  notice() {
    this.setData({
      notifyShowen: true,
      lock: true,
    })
  },
  cancelNotify() {
    this.setData({
      notifyShowen: false,
      lock: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.setData({
      nameBoxWidth: (app.data.width * 0.9 - 90) + 'px',
      concatBox_sonBoxwidth: (app.data.height - 146) / 2 + "px",
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})