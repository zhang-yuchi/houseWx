// pages/mywallet_fd/mywallet_fd.js
var ajax = require('../../utils/ajax.js')
var utils = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipshow:"none",
    canMoney:0,
    succesMoney:0,
    givemoney:0,
    wxId:"",
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
  getgivemoney(e){
    this.setData({
      givemoney:parseFloat(e.detail.value).toFixed(2)
    })
  },
  getwxId(e){
    this.setData({
      wxId:e.detail.value
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
    let that = this
    console.log(this.data.givemoney)
    // if(that.data.givemoney>that.data.canMoney){
    //   wx.showToast({
    //     title: '提现金额过多!',
    //     icon:"none"
    //   })
    //   return
    // }
    if(that.data.givemoney==0){
      wx.showToast({
        title: '提现金额不能为0',
        icon:"none"
      })
      return
    }
    // if(!that.data.wxId){
    //   wx.showToast({
    //     title: '微信号不能为空!',
    //     icon:"none"
    //   })
    //   return
    // }

    let user = wx.getStorageSync("userInfo")
    console.log(user)
    let openid = user.openId
    console.log(openid)
    let sign = utils.getMoney_fd(user,openid,that.data.givemoney)
    console.log(sign)
    wx.showLoading({
      title: '提交中',
    })
    ajax.requestByPost('/user/launchWithdraw',{
      money:that.data.givemoney,
      sign:sign,
      wxId:that.data.wxId
    },res=>{
      console.log(res)
      if(res.data.sataus==1){
        wx.hideLoading()
        this.setData({
          tipshow: "block"
        })
      }
      wx.hideLoading()
      wx.showToast({
        title: res.data.message,
        icon:"none"
      })
      
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
    new Promise(resolve=>{
      ajax.requestByGet('/user/info',{},res=>{
        console.log(res)
        that.setData({
          canMoney:res.data.data.money
        })
        resolve()
      })
    }).then(()=>{
      ajax.requestByGet('/user/allGetMoney', {}, function (res) {
        that.setData({
          succesMoney: res.data.data
        })
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