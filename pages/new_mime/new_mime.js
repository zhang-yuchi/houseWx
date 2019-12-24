// pages/new_mime/new_mime.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headPicLeft:"",
    concatBox_sonBoxwidth: "",
    concatBoxDisplay: "none",
    name: "",
    imagePic: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      headPicLeft:(app.data.width-100)/2 + "px"
    })
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