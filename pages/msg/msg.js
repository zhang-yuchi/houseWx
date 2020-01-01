// pages/msg/msg.js
var app = getApp();
var utils = require('../../utils/utils.js')
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemMsgs:[],
    userlist:[],
    host:app.data.requestHost,
    systemmsg:"",
    systemtime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let msgtimer = wx.getStorageSync("msgtimer")
    if(!msgtimer){
        msgtimer = setInterval(() => {
          ajax.requestByGet('/user/notifier/30', {}, res => {
            // console.log(res)
            if (res.data.status == 1) {
              let d = new Date(res.data.data[res.data.data.length - 1].gmtCreate)
              let sysdate = d.getHours() + ":" + d.getMinutes()
              that.setData({
                systemmsg: res.data.data[res.data.data.length - 1].content,
                systemtime: sysdate
              })
            }
          })
        utils.getNewList(that)
      }, 3000)
      wx.setStorageSync("msgtimer", msgtimer)
    }
    
  },
  toTalk(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../talk/talk?new='+id,
    })
  },
  todetail:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var arr = this.data.systemMsgs;
    var obj = {};
    for(var i=0;i<arr.length;i++){
      if(id == arr[i].id){
        obj = arr[i];
      }
    }
    wx.navigateTo({
      url: '../msgdetail/msgdetail?obj='+JSON.stringify(obj),
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

    let that = this
    ajax.requestByGet('/user/notifier/30', {}, res => {
      console.log(res)
      if (res.data.status == 1) {
        let d = new Date(res.data.data[res.data.data.length - 1].gmtCreate)
        let sysdate = d.getHours() + ":" + d.getMinutes()
        that.setData({
          systemmsg: res.data.data[res.data.data.length - 1].content,
          systemtime: sysdate
        })
      }
    })
    utils.getNewList(that)
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log(222)
    // wx.setStorageSync("msgtimer", null)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // wx.setStorageSync("msgtimer", null)
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