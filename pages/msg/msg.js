// pages/msg/msg.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemMsgs:[],
    host:app.data.requestHost
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    wx.request({
      url: app.data.requestHost + '/getAllMsg',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var result = res.data;
        that.setData({
          systemMsgs: JSON.parse(result.data)
        })
      },
    });
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