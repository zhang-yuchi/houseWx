// pages/moneydetails/moneydetails.js
var ajax = require('../../utils/ajax.js')
const moment = require('../../utils/moment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  //页面跳转
  toMoneyDetails_yj: function(e) {
    let obj = {}
    let index = e.currentTarget.dataset.index;
    obj = this.data.list[index]
    // console.log(e)
    wx.navigateTo({
      url: '../moneydetails_yj/moneydetails_yj?obj=' + JSON.stringify(obj),
    })
  },
  toMoneyDetails_zj: function(e) {
    let obj = {}
    let index = e.currentTarget.dataset.index;
    obj = this.data.list[index]
    wx.navigateTo({
      url: '../moneydetails_zj/moneydetails_zj?obj='+ JSON.stringify(obj),
    })
  },
  toMoneyDetails_sd: function(e){
    let obj = {}
    let index = e.currentTarget.dataset.index;
    obj = this.data.list[index]
    wx.navigateTo({
      url: '../moneydetails_sd/moneydetails_sd?obj=' + JSON.stringify(obj),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    ajax.requestByGet('/house/roomer',{},res=>{
      // console.log(res)
      if(res.data.status==1){
        let arr = []
        for(let item of res.data.data){
          let date = moment(item.payDate).format('YYYY-MM-DD')
          // item.payDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
          item.payDate = date
          arr.push(item)
        }
        that.setData({
          list:arr
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon:"none",
        })
        // return
      }
    })
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