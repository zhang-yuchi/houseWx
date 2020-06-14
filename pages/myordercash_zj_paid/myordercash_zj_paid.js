// pages/myordercash_zj_paid/myordercash_zj_paid.js
var ajax = require('../../utils/ajax.js')
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
    var that = this;
    var index = options.index
    ajax.requestByGet('/user/bill', {}, function (res) {
      var data = res.data.data[index];
      // console.log(data);
      var obj = {};
      obj.houseInfo = data.houseInfo;
      obj.houseType = data.houseType;
      obj.money = data.money;
      obj.remark = data.remark;
      obj.dead_date = data.dead_date.split('T')[0];
      obj.gmtCreate = data.gmtCreate.split('T')[0];
      obj.payDate = data.payDate.split('T')[0];
      obj.payDetailFee1 = data.payDetailFee1
      obj.payDetailFee2 = data.payDetailFee2
      that.setData({
        obj: obj
      })
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