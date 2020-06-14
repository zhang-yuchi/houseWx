// pages/msg/msg.js
var app = getApp();
var utils = require('../../utils/utils.js')
const moment = require('../../utils/moment')
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
    systemtime:"",
    timer:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
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
    if(arr.length==0){
      wx.showToast({
        title: '暂无系统通知',
        icon:"none"
      })
      return
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
    
    let timer = setInterval(this.RunTimer(),3000)
    this.setData({
      timer:timer
    })
    
  },
  RunTimer(){
    //需求:启动定时器时执行一次getAllListOnce
    //然后在定时器状态下 返回getAllListOnce
    // console.log(this)
    this.getAllListOnce()
    return this.getAllListOnce
  },
  getAllListOnce(){//获取一次所有列表
    const that = this
    // console.log("轮询中...")
    ajax.requestByGet('/user/notifier/30', {}, res => {
      // console.log(res)
      if (res.data.status == 1) {
        let sysdate = null
        if (res.data.data.length > 0) {
          let sysdate = moment(res.data.data[res.data.data.length - 1].gmtCreate).format('HH:mm')
          // sysdate = d.getHours() + ":" + d.getMinutes()
          that.setData({
            systemmsg: res.data.data ? res.data.data[res.data.data.length - 1].content : "",
            systemtime: sysdate
          })
        }
      }
    })
    utils.getNewList(that)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer)
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