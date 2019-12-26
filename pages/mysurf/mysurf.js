// pages/myorder/myorder.js
var app = getApp();
var ajax = require('../../utils/ajax.js')
var utils = require('../../utils/utils.js')
var allArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: "",
    barArr: [
      { name: "房源信息", id: 0, className: "inner-btn select-btn" },
      { name: "生活服务", id: 1, className: "inner-btn" }
    ],
    houses:[],
    host:app.data.requestHost
  },
  tohousedetails() {
    wx.navigateTo({
      url: '../housedetail/housedetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    ajax.requestByGet('/user/browse',{
      limit:10,
      start:1
    },(res)=>{
      console.log(res)
      let houses = res.data.data
      for(let item of houses){
        // console.log(utils.tagsToArr(item.tags))
        item.tags = utils.tagsToArr(item.tags)
      }
      that.setData({
        houses: houses
      })
      console.log(res.data.data)
    })
  },
  changeBar: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.barArr;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        arr[i].className = "son_text"
      } else {
        arr[i].className = "son_textC"
      }
    }
    that.setData({
      barArr: arr
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
    var id = wx.getStorageSync('id');
    that.setData({
      scrollViewHeight: (app.data.height - 50) + "px"
    });
    
  },
  tohousedetail: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.houseSets;
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        obj = arr[i];
        break;
      }
    }
    wx.navigateTo({
      url: '../housedetail/housedetail?obj=' + JSON.stringify(obj),
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