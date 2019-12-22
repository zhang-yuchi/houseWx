// pages/hx/hx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    middle_check_sonwidth: "",
    middle_check_son_textleft: "",
    btnLeft: "",
    cx:wx.getStorageSync("saixuanlist").cx,
    zf: wx.getStorageSync("saixuanlist").zf
  },
  toarea() {
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
      btnLeft: (app.data.width - 311) / 2 + "px"
    })
  },
  sxBind: function (e) {
    var that = this;
    var id = e.target.id;
    var cx = that.data.cx;
    for(var i=0;i<cx.length;i++){
      if(cx[i].id == id){
        cx[i].className = "barBtn barBtnC";
      }else{
        cx[i].className = "barBtn";
      }
    }
    that.setData({
      cx:cx
    })
  },
  zfBind: function (e) {
    var that = this;
    var id = e.target.id;
    var cx = that.data.zf;
    for (var i = 0; i < cx.length; i++) {
      if (cx[i].id == id) {
        cx[i].className = "barBtn barBtnC";
      } else {
        cx[i].className = "barBtn";
      }
    }
    that.setData({
      zf: cx
    })
  },
  tomoney(){
    wx.redirectTo({
      url: '../price/price',
    })
    
  },
  tohx(){
    wx.redirectTo({
      url: '../hx/hx',
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