// pages/price/price.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    middle_check_sonwidth: "",
    middle_check_son_textleft:"",
    btnLeft:"",
    userselect:[
      {
        name:"不限",
        classname:"active",
      },
      {
        name: "价格由低到高",
        classname: "",
      },
      {
        name: "价格由高到低",
        classname: "",
      },
      {
        name: "时间由新到旧",
        classname: "",
      },
    ]
  },
  chooseprice(e){
    let index = e.currentTarget.dataset.index
    for(let item of this.data.userselect){
      item.classname = ""
    }
    this.data.userselect[index-1].classname = "active"
    this.setData({
      userselect: this.data.userselect
    })
  },
  tohx(){
    wx.redirectTo({
      url: '../hx/hx',
    })
  },
  toshaixuan(){
    wx.redirectTo({
      url: '../saixuan/saixuan',
    })
  },
  toarea(){
    wx.redirectTo({
      url: '../area/area',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      middle_check_sonwidth: (app.data.width / 5 - 5) + "px",
      middle_check_son_textleft: (app.data.width / 5 - 37) / 2 + "px",
      btnLeft: (app.data.width-311)/2+"px"
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