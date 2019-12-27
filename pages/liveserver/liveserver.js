// pages/liveserver/liveserver.js
let ajax = require('../../utils/ajax.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight:"",
    itemBoxDetail_right_width:"",
    barArr:[
      { name: "房屋租赁", value:"房屋租赁", id: 0, className: "barBox_sonC"},
      { name: "餐饮美食", value: "餐饮美食", id: 1, className: "barBox_son" },
      { name: "零售便利", value: "零售便利", id: 2, className: "barBox_son" },
      { name: "美容美发", value: "美容美发", id: 3, className: "barBox_son" },
      { name: "家庭维修", value: "家庭维修", id: 4, className: "barBox_son" },
    ],
    nowlist:[],
    select:"房屋租赁",
    search:""
  },
  search(){
    console.log(this.data.search)
    let search = this.data.search
    wx.navigateTo({
      url: '../livesearch/livesearch?search='+search,
    })
  },
  input(e){
    // console.log(e.detail.value)
    this.setData({
      search:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.requestByGet('/store/list/房屋租赁',{},(res)=>{
      if(res.data.data.length>0){
        this.setData({
          nowlist: res.data.data
        })
      }
    })
  },
  getBar:function(e){
    let that = this
    var id = e.currentTarget.id;
    var arr = this.data.barArr
    let value = ""
    for(var i=0;i<arr.length;i++){
      if(arr[i].id == id){
        arr[i].className = "barBox_sonC"
        value = arr[i].value
        ajax.requestByGet('/store/list/'+value,{},(res)=>{
          if(res.data.data.length>0){
            that.setData({
              barArr: arr,
              nowlist:res.data.data,
              select:value
            })
          }else{
            that.setData({
              barArr: arr,
              nowlist:[],
              select: value
            })
          }
          console.log(that.data)
        })
      }else{
        arr[i].className = "barBox_son"
      }
    }
    
  },
  toliveserverdetail: function (e) {
    let index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../liveserver_detial/liveserver_detial'+'?index='+index,
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
      scrollViewHeight:(app.data.height-120)+"px",
      itemBoxDetail_right_width:(app.data.width*0.95-135)+"px"
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