// pages/new_mime/new_mime.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    concatBox_sonBoxwidth: "",
    concatBoxDisplay: "none",
    name: "",
    imagePic: ""
  },
  fdauth(){
    wx.navigateTo({
      url: '../usertofd/usertofd',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      name: userInfo.nickName,
      imagePic: userInfo.authImgUrl
    })
  },
  
  tosurf: function () {
    wx.navigateTo({
      url: '../mysurf/mysurf',
    })
  },
  tomysc:function(){
    wx.navigateTo({
      url: '../mysc/mysc',
    })
  },
  showConcatBox: function () {
    var that = this;
    that.setData({
      concatBoxDisplay: "block"
    })
  },
  cancel: function () {
    var that = this;
    that.setData({
      concatBoxDisplay: "none"
    })
  },
  tomyorder: function () {
    var that = this;
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  tomyfixed: function () {
    var that = this;
    wx.navigateTo({
      url: '../myfixed/myfixed',
    })
  },
  tosc: function () {
    var that = this;
    wx.navigateTo({
      url: '../sc/sc',
    })
  },
  tomyordercash: function () {
    var that = this;
    wx.navigateTo({
      url: '../myordercash/myordercash',
    })
  },
  toQuanxian: function () {
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '提示',
            content: '请求获取位置权限',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      nameBoxWidth: (app.data.width * 0.9 - 90) + 'px',
      concatBox_sonBoxwidth: (app.data.height - 146) / 2 + "px",
    })
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '020-202525562' //仅为示例，并非真实的电话号码
    })
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})