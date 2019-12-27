// pages/middle_mime/middle_mime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var isFd = wx.getStorageSync('userInfo').landlord;
    console.log(isFd)
    if(isFd==1){
      //是房东
      wx.navigateTo({
        url: '../fd_mime/fd_mime',
      })
    }else{
      wx.navigateTo({
        url: '../new_mime/new_mime',
      })
    }
    // if (isFd == "no") {
    //   wx.navigateTo({
    //     url: '../new_mime/new_mime',
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../fd_mime/fd_mime',
    //   })
    // }
  },
  go:function(){
    var that = this;
    var isFd = wx.getStorageSync('userInfo').landlord;
    if (isFd == 0) {
      wx.navigateTo({
        url: '../new_mime/new_mime',
      })
    } else {
      wx.navigateTo({
        url: '../fd_mime/fd_mime',
      })
    }
  },
  
  toyonghu(){
    wx.navigateTo({
      url: '../new_mime/new_mime',
    })
  },
  tofangdong(){
    wx.navigateTo({
      url: '../fd_mime/fd_mime',
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