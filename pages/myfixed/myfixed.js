// pages/myfixed/myfixed.js
var app = getApp();
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: "",
    barArr: [
      { name: "待处理", id: 0, className: "son_text" },
      { name: "已处理", id: 1, className: "son_textC" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.requestByGet('/user/repair',{},res=>{
      console.log(res)
    })
  },
  changeBar: function (e) {
    let that = this;
    let id = e.currentTarget.id;
    let arr = that.data.barArr;
    for (let i = 0; i < arr.length; i++) {
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
  toFixedDetails(){
    wx.navigateTo({
      url: '../myfixed_details/myfixed_details',
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
      scrollViewHeight: (app.data.height - 30) + "px"
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