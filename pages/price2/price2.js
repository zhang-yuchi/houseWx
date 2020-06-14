// pages/price2/price2.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    middle_check_sonwidth: "",
    middle_check_son_textleft: "",
    btnLeft: "",
    userselect:[]
  },
  toarea(){
    wx.redirectTo({
      url: '../area/area',
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
  tosort(){
    wx.redirectTo({
      url: '../price/price',
    })
  },
  chooseprice(e){
    let index = e.currentTarget.dataset.id
    let arr = this.data.userselect
    for(let id in arr){
      if(id == index){
        arr[id].classname = "active"
        arr[id].select = true
        continue
      }
      arr[id].classname = ""
      arr[id].select = false
    }
    this.setData({
      userselect:arr
    })
  },
  tosure(){
    let moneylist = wx.getStorageSync("moneylist")
    let userselect = wx.getStorageSync("userSelect")
    let arr = this.data.userselect
    wx.setStorageSync("moneylist", arr)
    for(let item of arr){
      // console.log(item)
      if(item.select){
        //被选中
        userselect.price = item.value
      }
    }
    wx.setStorageSync("userSelect", userselect)
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userselect: wx.getStorageSync("moneylist")
    })
    // console.log(wx.getStorageSync("moneylist"))
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