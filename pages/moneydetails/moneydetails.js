// pages/moneydetails/moneydetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{

    }]
  },
  //页面跳转
  toMoneyDetails_yajin: function() {
    wx.navigateTo({
      url: '../moneydetails_yj/moneydetails_yj',
    })
  },
  toMoneyDetails_zujin: function(e) {
    wx.navigateTo({
      url: '../moneydetails_zj/moneydetails_zj',
    })
  },
  toMoneyDetails_shuidian: function() {
    if (paid) {
      wx.navigateTo({
        url: '../moneydetails_shuidian/moneydetails_shuidian_paid',
      })
    } else {
      wx.navigateTo({
        url: '../moneydetails_shuidian/moneydetails_shuidian',
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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