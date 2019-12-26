// pages/myorder/myorder.js
var app = getApp();
var ajax = require('../../utils/ajax.js')
var allArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: "",
    barArr: [
      { name: "房源信息", id: 0, className: "inner-btn select-btn" },
      { name: "生活服务", id: 1, className: "inner-btn" }
    ],
    houseSets: [],
    host: app.data.requestHost
  },
  tohousedetails(e){
    let index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../housedetail/housedetail?obj='+index,
    })
  },
  changemodel(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    for(let i in this.data.barArr){
      if(i==index){
        this.data.barArr[i].className = "inner-btn select-btn"
      }else{
        this.data.barArr[i].className = "inner-btn"
      }
    }
    for(let item of this.data.barArr){
      if(item.className == "inner-btn select-btn"){
        if(item.name == "房源信息"){
          //此时请求房源接口

        }else{
          //此时请求生活服务接口

        }
      }
    }
    this.setData({
      barArr:this.data.barArr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.requestByGet('/user/star/house',{},function(res){
      console.log(res)
    })
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