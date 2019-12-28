// pages/housedetail/housedetail.js
var app = getApp();
let ajax = require('../../utils/ajax.js')
let QQMap = require('../../utils/qqmap-wx-jssdk.min.js')
let qqMap = new QQMap({
  key: app.data.mapKey
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: "",
    obj: {},
    host: app.data.requestHost,
    details:{},
    images:[],
    phone:"",
    phonecall:false,
    icon:''
  },
  tolocation(){
    let that = this
    const addr = this.data.details.address
    console.log(addr)
    qqMap.geocoder({
      address:addr,
      success: res => {
        console.log(res.result.location);   //经纬度对象
        const location = res.result.location
        wx.openLocation({
          latitude:location.lat ,
          longitude: location.lng,
          name:that.data.details.address,
          scale: 28
        })
      }
    })
  },
  call(){
    this.setData({
      phonecall:true
    })
  },
  cancelCall(){
    this.setData({
      phonecall: false
    })
  },
  mkphone(){
    let that = this
    wx.makePhoneCall({
      phoneNumber:that.data.details.phone ,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var index = options.index;
    ajax.requestByGet('/store/'+index,{},(res)=>{
      console.log(res)
      let details = res.data.data
      that.setData({
        details:details,
        phone:details.phone
      })
    })
    ajax.requestByGet('/store/img/'+index,{},(res)=>{
      console.log(res)
      that.setData({
        images:res.data.data
      })
    })
    // that.setData({
    //   obj: JSON.parse(obj),
    //   firstLevel: JSON.parse(obj).houseinfo.jj_1,
    //   secondLevel: JSON.parse(obj).houseinfo.jj_2
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      scrollViewHeight: (app.data.height - 60)*2 + "rpx"
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