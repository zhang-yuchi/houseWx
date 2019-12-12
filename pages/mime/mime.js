// pages/mime/mime.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameBoxWidth:"",
    concatBox_sonBoxwidth:"",
    concatBoxDisplay:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tosurf:function(){
    wx.navigateTo({
      url: '../mysurf/mysurf',
    })
  },
  cancel:function(){
    var that = this;
    that.setData({
      concatBoxDisplay:"none"
    })
  },
  showConcatBox:function(){
    var that = this;
    that.setData({
      concatBoxDisplay: "block"
    })
  },
  tomyorder:function(){
    var that = this;
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  tomyfixed:function(){
    var that = this;
    wx.navigateTo({
      url: '../myfixed/myfixed',
    })
  },
  tosc:function(){
    var that = this;
    wx.navigateTo({
      url: '../sc/sc',
    })
  },
  tomyordercash:function(){
    var that = this;
    wx.navigateTo({
      url: '../myordercash/myordercash',
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
      nameBoxWidth:(app.data.width*0.9-90)+'px',
      concatBox_sonBoxwidth:(app.data.height-146)/2+"px",
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