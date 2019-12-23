// pages/change_infodetails/change_infodetails.js
var ajax = require("../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick_name:'',
    gender:0,
    genderArr:['未填写','男','女'],
    country:'',
    city: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync("userInfo"));
    console.log(wx.getStorageSync("userInfo").gender);
    this.setData({
      gender: wx.getStorageSync("userInfo").gender
    })
  },
  
  bindGenderPickerChange: function(e){
    // console.log(this.data.genderArr[e.detail.value]);
    // console.log(e.detail.value)
    this.setData({
      gender: e.detail.value
    })
  },
  toChooseCity:function(){
    wx.navigateTo({
      url: '../city2/city2',
    })
  },
  smtChangeInfo:function(){
    let that = this;
    ajax.requestByGet('/user/info',{
      city:that.data.city,
      gender:that.data.gender
    },function(){
      wx.navigateBack({
        delta:1
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