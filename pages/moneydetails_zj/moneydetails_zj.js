// pages/moneydetails_zj/moneydetails_zj.js
const moment = require('../../utils/moment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = JSON.parse(options.obj)
    obj.payDate = moment(obj.payDate).format('YYYY-MM-DD')
    // obj.payDate = payDate.getFullYear() + '-' + (payDate.getMonth() + 1) + '-' + payDate.getDate()
    obj.gmtDate = moment(obj.gmtCreate).format('MM')
    // obj.month = gmtDate.getMonth()
    // console.log(obj)
    this.setData({
      obj: obj
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