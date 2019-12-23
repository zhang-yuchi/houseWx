// pages/myordercash/myordercash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barArr: [{
        name: "未缴费账单",
        id: 0,
        className: "son_text"
      },
      {
        name: "已缴费账单",
        id: 1,
        className: "son_textC"
      }
    ],
    myordercash:[],
    myordercashNow:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var arr = [];
    this.setData({
      myordercashNow:arr
    })



  },
  changeBar: function(e) {
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.barArr;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        arr[i].className = "son_text";
      } else {
        arr[i].className = "son_textC"
      }
    }
    that.setData({
      barArr: arr
    })
  },

  //页面跳转
  tomyordercash_yj:function(){
    if(1){//判断是否支付
      wx.navigateTo({
        url: '../myordercash_yj_paid/myordercash_yj_paid',
      })
    }else{
      wx.navigateTo({
        url: '../myordercash_yj_unpaid/myordercash_yj_unpaid',
      })
    }
  },
  tomyordercash_zj: function () {
    if (0) {
      wx.navigateTo({
        url: '../myordercash_zj_paid/myordercash_zj_paid',
      })
    } else {
      wx.navigateTo({
        url: '../myordercash_zj_unpaid/myordercash_zj_unpaid',
      })
    }
  },
  tomyordercash_sd: function () {
    if (0) {
      wx.navigateTo({
        url: '../myordercash_sd_paid/myordercash_sd_paid',
      })
    } else {
      wx.navigateTo({
        url: '../myordercash_sd_unpaid/myordercash_sd_unpaid',
      })
    }
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