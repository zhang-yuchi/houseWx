// pages/hx/hx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    middle_check_sonwidth: "",
    middle_check_son_textleft: "",
    btnLeft:"",
    arr:[{ name: "不限", id: 0, className: "barBtnC" },
  { name: "一室", id: 1, className: "barBtn" },
  { name: "二室", id: 2, className: "barBtn" },
  { name: "三室", id: 3, className: "barBtn" }
  ],
    btnLeft: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      btnLeft: (app.data.width - 311) / 2 + "px"
    })
  },
  sxBind: function (e) {
    var that = this;
    var id = e.target.id;
    var cx = that.data.arr;
    for (var i = 0; i < cx.length; i++) {
      if (cx[i].id == id) {
        cx[i].className = "barBtnC";
      } else {
        cx[i].className = "barBtn";
      }
    }
    that.setData({
      arr: cx
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
    that.setData({
      middle_check_sonwidth: (app.data.width / 5 - 5) + "px",
      middle_check_son_textleft: (app.data.width / 5 - 37) / 2 + "px",
      btnLeft: (app.data.width - 311) / 2 + "px"
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