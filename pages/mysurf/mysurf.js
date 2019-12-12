// pages/myorder/myorder.js
var app = getApp();
var allArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: "",
    barArr: [
      { name: "履行中", id: 0, className: "son_text" },
      { name: "已结束", id: 1, className: "son_textC" }
    ],
    houseSets:[],
    host:app.data.requestHost
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeBar: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.barArr;
    for (var i = 0; i < arr.length; i++) {
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
    var id = wx.getStorageSync('id');
    that.setData({
      scrollViewHeight: (app.data.height - 50) + "px"
    });
    wx.request({
      url: app.data.requestHost + '/getAllHouseById',
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data:{
        id:id
      },
      success: function (res) {
        var result = res.data;
        if (result.status == "200" && result.code == "1") {
          var arr = JSON.parse(result.data.houseData);
          var newHouseSets = [];
          for (var i = 0; i < arr.length; i++) {
            var obj = {};
            obj = arr[i];
            obj.houseinfo = JSON.parse(arr[i].houseinfo);
            newHouseSets.push(obj)
          }
          allArr = newHouseSets;
          that.setData({
            houseSets: newHouseSets
          })
          console.log(that.data.houseSets)
        }
      },
    });
  },
  tohousedetail: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.houseSets;
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        obj = arr[i];
        break;
      }
    }
    wx.navigateTo({
      url: '../housedetail/housedetail?obj=' + JSON.stringify(obj),
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