// pages/msg/msg.js
var app = getApp();
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemMsgs:[],
    userlist:[],
    host:app.data.requestHost
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let msgtimer = wx.getStorageSync("msgtimer")
    if(!msgtimer){
        msgtimer = setInterval(() => {
        ajax.requestByGet('/tim/chatter', {}, res => {
          // console.log(res.data.data)
          for (let item of res.data.data) {
            let d = new Date(item.latest100Msgs[item.latest100Msgs.length - 1].gmtSend)
            let date = d.getHours() + ":" + d.getMinutes()
            item.latest100Msgs[item.latest100Msgs.length - 1].gmtSend = date
          }

          // console.log(date)

          console.log(res.data.data)
          that.setData({
            userlist: res.data.data
          })
        })
      }, 10000)
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
    ajax.requestByGet('/tim/chatter', {}, res => {
      console.log(res.data.data)
      for (let item of res.data.data) {
        let d = new Date(item.latest100Msgs[item.latest100Msgs.length - 1].gmtSend)
        let date = d.getHours() + ":" + d.getMinutes()
        item.latest100Msgs[item.latest100Msgs.length - 1].gmtSend = date
      }
      that.setData({
        userlist: res.data.data
      })
    })
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log(222)
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log(111)
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