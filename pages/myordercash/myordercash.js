// pages/myordercash/myordercash.js
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barArr: [{
        name: "未缴费账单",
        id: 0,
        className: "son_text",
        select: true
      },
      {
        name: "已缴费账单",
        id: 1,
        className: "son_textC",
        select: false
      }
    ],
    myordercashUnpaid: [],
    myordercashPaid: [],
    myordercashNow: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    ajax.requestByGet('/user/bill', {}, function(res) {
      console.log(res);
      var myordercashUnpaid = [];
      var myordercashPaid = [];
      var payList = res.data.data
      for (let item of payList) {
        if (item.isPaid) {
          myordercashPaid.push(item)
        } else {
          myordercashUnpaid.push(item)
        }
      }
      // console.log(myordercashPaid);
      // console.log(myordercashUnpaid);
      that.setData({
        myordercashUnpaid: myordercashUnpaid,
        myordercashPaid: myordercashPaid,
        myordercashNow: myordercashUnpaid
      })
    })
  },
  
  changeBar: function(e) {
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.barArr;
    var myordercashNow = that.data.myordercashNow;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        arr[i].className = "son_text";
        arr[i].select = true;
      } else {
        arr[i].className = "son_textC";
        arr[i].select = false;
      }
    }
    if (id == 0) {
      myordercashNow = that.data.myordercashUnpaid
    } else {
      myordercashNow = that.data.myordercashPaid
    }
    that.setData({
      barArr: arr,
      myordercashNow: myordercashNow
    })
  },

  //页面跳转
  tomyordercash_yj: function() {
    var that = this;
    if (that.data.barArr[0].select) {
      wx.navigateTo({
        url: '../myordercash_yj_unpaid/myordercash_yj_unpaid',
      })
    } else {
      wx.navigateTo({
        url: '../myordercash_yj_paid/myordercash_yj_paid',
      })
    }
  },
  tomyordercash_zj: function() {
    var that = this;
    if (that.data.barArr[0].select) {
      wx.navigateTo({
        url: '../myordercash_zj_unpaid/myordercash_zj_unpaid',
      })
    } else {
      wx.navigateTo({
        url: '../myordercash_zj_paid/myordercash_zj_paid',
      })
    }
  },
  tomyordercash_sd: function() {
    var that = this;
    if (that.data.barArr[0].select) {
      wx.navigateTo({
        url: '../myordercash_sd_unpaid/myordercash_sd_unpaid',
      })
    } else {
      wx.navigateTo({
        url: '../myordercash_sd_paid/myordercash_sd_paid',
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