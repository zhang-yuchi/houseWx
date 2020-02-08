// pages/myordercash/myordercash.js
var ajax = require('../../utils/ajax.js')
var app = getApp();
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
    myordercashNow: [],
    scrollViewHeight: '',
    status: ''
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
      if (res.data.status != 1) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        var payList = res.data.data
        for (let item of payList) {
          item.gmtCreate = (item.gmtCreate.split('T'))[0]
          if (item.isPaid) {
            myordercashPaid.push(item);

          } else {
            myordercashUnpaid.push(item)
          }
        }
        myordercashUnpaid = myordercashUnpaid.reverse()
        myordercashPaid = myordercashPaid.reverse()
        that.setData({
          myordercashUnpaid: myordercashUnpaid,
          myordercashPaid: myordercashPaid,
          myordercashNow: myordercashUnpaid,
          status: res.data.status
        })
      }
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
  tomyordercash_yj: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (that.data.barArr[0].select) {
      wx.navigateTo({
        url: `../myordercash_yj_unpaid/myordercash_yj_unpaid?index=${index}`,
      })
    } else {
      wx.navigateTo({
        url: `../myordercash_yj_paid/myordercash_yj_paid?index=${index}`,
      })
    }
  },
  tomyordercash_zj: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (that.data.barArr[0].select) {
      wx.navigateTo({
        url: `../myordercash_zj_unpaid/myordercash_zj_unpaid?index=${index}`,
      })
    } else {
      wx.navigateTo({
        url: `../myordercash_zj_paid/myordercash_zj_paid?index=${index}`,
      })
    }
  },
  tomyordercash_sd: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (that.data.barArr[0].select) {
      wx.navigateTo({
        url: `../myordercash_sd_unpaid/myordercash_sd_unpaid?index=${index}`,
      })
    } else {
      wx.navigateTo({
        url: `../myordercash_sd_paid/myordercash_sd_paid?index=${index}`,
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
    let that = this;
    that.setData({
      scrollViewHeight:(app.data.height*2 - 100) + "rpx"
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