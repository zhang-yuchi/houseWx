// pages/mywallet_fd/mywallet_fd.js
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipshow:"none",
    cards:[
      {
        cardnum:"2133",
        type:"gongshang",
        checked:false,
      },
      {
        cardnum: "2134",
        type: "jianshe",
        checked: false,
      },
      {
        cardnum: "2133",
        type: "zhongguo",
        checked: false,
      }
    ],
    canMoney:0,
    succesMoney:0
  },
  select(e){
    var index = e.currentTarget.dataset.id
    for(var item of this.data.cards){
      item.checked = false
      
    }
    this.data.cards[index].checked = true
    this.setData({
      cards:this.data.cards
    })
  },
  toaddCard(){
    //跳转到银行卡付款页面
    wx.navigateTo({
      url: '../bindcard/bindcard',
    })
  },
  tomoneydetails(){
    //跳转到金额明细
    wx.navigateTo({
      url: '../moneydetails/moneydetails',
    })
  },
  topulldetails(){
    //跳转到提现明细
    wx.navigateTo({
      url: '../pulldetails/pulldetails',
    })
  },
  tocash(){
    //经过一系列判断后:
    

    this.setData({
      tipshow:"block"  
    })
  },
  sure(){
    this.setData({
      tipshow: "none" 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    ajax.requestByGet('/user/allGetMoney', {}, function (res) {
      that.setData({
        succesMoney:res.data.data
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