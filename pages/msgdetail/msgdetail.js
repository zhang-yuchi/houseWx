// pages/msgdetail/msgdetail.js
let ajax = require('../../utils/ajax.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    font:"",
    pic:"",
    msg:[],
    tobottom:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    ajax.requestByGet('/user/notifier/30',{},function(res){
      // console.log(res)
      that.setData({
        msg:res.data.data,
        tobottom: "msg" + (res.data.data.length-1)
      })
      // console.log(that.data)
    })
    // that.setData({
    //   font:JSON.parse(options.obj).con,
    //   pic: app.data.requestHost + JSON.parse(options.obj).imageindex
    // })
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