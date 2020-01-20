// pages/moneydetails/moneydetails.js
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  //页面跳转
  toMoneyDetails_yajin: function() {
    wx.navigateTo({
      url: '../moneydetails_yj/moneydetails_yj',
    })
  },
  toMoneyDetails_zujin: function(e) {
    wx.navigateTo({
      url: '../moneydetails_zj/moneydetails_zj',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    ajax.requestByGet('/house/roomer',{},res=>{
      console.log(res)
      if(res.data.status==1){
        let arr = []
        for(let item of res.data.data){
          let date = new Date(item.payDate)
          item.payDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
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