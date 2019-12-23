// pages/index/index.js
var app = getApp();
var allArr = [];
var ajax = require("../../utils/ajax.js")
var subwayUtil = require('../../utils/subwayUtil.js')
var utils = require('../../utils/utils.js')
var QQMap = require('../../utils/qqmap-wx-jssdk.min.js')
let qqMap = new QQMap({
  key: "OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE"
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowcity: wx.getStorageSync("citylist") ? wx.getStorageSync("citylist").city:"",
    houses:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    ajax.requestByGet('/user/info',{},function(res){
      wx.setStorageSync("userInfo", res.data.data)
      console.log(wx.getStorageSync("userInfo"))
    })

    //获取房源信息
    
    if (!wx.getStorageSync("userSelect")){
      utils.initSelect(function(){
        ajax.requestByGet('/house', wx.getStorageSync("userSelect"), function (res) {
          that.setData({
            houses: res.data.data
          })
        })
      })
    }else{
      console.log(wx.getStorageSync("userSelect"))
      ajax.requestByGet('/house',wx.getStorageSync("userSelect"),function(res){
        that.setData({
          houses:res.data.data
        })
        console.log(that.data)
      })
      
    }
    // wx.setStorageSync("userSelect", null)
    
    //获取轮播图


  },
  toPrice:function(){
    wx.navigateTo({
      url: '../price/price',
    })
  },
  toarea(){
    wx.navigateTo({
      url: '../area/area',
    })
  },
  tohousedetails(e){
    const id = e.currentTarget.dataset.id
    console.log(id)
    ajax.requestByGet(`/house/${id}`,{},(res)=>{
      console.log(res.data.data)
      wx.navigateTo({
        url: `../housedetail/housedetail?obj=${JSON.stringify(res.data.data)}`,
      })
    })
    // wx.navigateTo({
    //   url: '../housedetail/housedetail',
    // })
  },
  check:function(e){
    var value = e.detail.value;
    var arr = this.data.houseSets;
    var newArr = [];
    var obj = {};
    for(var i=0;i<allArr.length;i++){
      if(allArr[i].houseinfo.addr.indexOf(value) != -1){
        newArr.push(allArr[i]);
      }
    }
    this.setData({
      houseSets:newArr
    })
  },
  reverse:function(){
    var that = this;
    that.setData({
      houseSets:that.data.houseSets.reverse()
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
      searchBoxInputWidth:(app.data.width-136)+"px",
      inputWidth: (app.data.width - 136-14-25)+"px",
      itembox_sonwidth:(app.data.width/3)+"px",
      middle_check_sonwidth: (app.data.width / 5-5) + "px",
      middle_check_son_textleft: (app.data.width / 5-37)/2 + "px",
      scrollViewHeight:(app.data.height*0.745-190)+"px",
      sx_son_width:(app.data.width*0.95*0.6/4-6)+"px",
    });
    //请求所有房间数据


    //获取权限
    
    // wx.setStorageSync('citylist', null)
    if (!wx.getStorageSync('citylist')) {
      // console.log("进入了")
      //第一次配置
      //配置租金,户型,筛选,附近 四个基本表
      if (!wx.getStorageSync("fjlist")) {
        wx.setStorageSync("fjlist", [
          //没有这个列表则创建一个新的
          {
            name: "不限",
            select: false,
            classname: ""
          },
          {
            name: "1000m内",
            select: false,
            classname: ""
          },
          {
            name: "3000m内",
            select: false,
            classname: ""
          },
          {
            name: "5000m内",
            select: false,
            classname: ""
          },
          {
            name: "10000m内",
            select: false,
            classname: ""
          }])
      }
      if (!wx.getStorageSync("pricelist")) {
        wx.setStorageSync("pricelist", [
          {
            name: "不限",
            classname: "active",
            select: true,
          },
          {
            name: "价格由低到高",
            classname: "",
            select: false,
          },
          {
            name: "价格由高到低",
            classname: "",
            select: false,
          },
          {
            name: "时间由新到旧",
            classname: "",
            select: false,
          },
        ])
      }
      if (!wx.getStorageSync("hxlist")) {
        wx.setStorageSync("hxlist", [
          { name: "不限", id: 0, className: "barBtn barBtnC", select: true },
          { name: "一室", id: 1, className: "barBtn", select: false },
          { name: "二室", id: 2, className: "barBtn", select: false },
          { name: "三室", id: 3, className: "barBtn", select: false }
        ])
      }
      if (!wx.getStorageSync("saixuanlist")) {
        wx.setStorageSync("saixuanlist", {
          cx: [
            { name: "不限", id: 0, className: "barBtn barBtnC", select: true },
            { name: "东", id: 1, className: "barBtn", select: false },
            { name: "南", id: 2, className: "barBtn", select: false },
            { name: "西", id: 3, className: "barBtn", select: false },
            { name: "北", id: 4, className: "barBtn", select: false },
            { name: "南北", id: 5, className: "barBtn", select: false },
          ],
          zf: [//多选
            { name: "押一付一", id: 1, className: "barBtn", select: false },
            { name: "配套齐全", id: 2, className: "barBtn", select: false },
            { name: "可短租", id: 3, className: "barBtn", select: false },
            { name: "女生合租", id: 4, className: "barBtn", select: false },
            { name: "男生合租", id: 5, className: "barBtn", select: false },
            { name: "独立阳台", id: 6, className: "barBtn", select: false },
          ]
        })
      }

      //获取用户位置来得到市区信息

      new Promise((resolve, reject) => {
        wx.getLocation({
          success: function (res) {
            qqMap.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success(res) {
                let addr = res.result.address
                let sheng = addr.indexOf('省')
                let shi = addr.indexOf('市')
                let checkSheng = addr.indexOf('省') != -1
                let checkshi = addr.indexOf('市') != -1
                let citylist = {
                  provicename: "",
                  city: "",
                  same: false
                }
                if (checkSheng && checkshi) {
                  //有省也有市
                  citylist.city = addr.substring(sheng + 1, shi)
                  citylist.provicename = addr.substring(0, sheng)
                } else if (!checkSheng && checkshi) {
                  //没有省只有市
                  citylist.city = addr.substring(sheng + 1, shi)
                  citylist.provicename = city
                  citylist.same = true
                }
                wx.setStorageSync("citylist", citylist)
                resolve()
              }
            })
          },
        })
      }).then(() => {
        let city = wx.getStorageSync("citylist").city

        //获取城市地铁列表
        utils.initIndex(city, that)
      })
    }
    console.log(wx.getStorageSync("citychanges"))
    if (wx.getStorageSync("citychanges")) {
      //城市发生改变 重新获取地铁信息
      let city = wx.getStorageSync("citylist").city
      console.log(city)
      utils.initIndex(city, that)
      //更新完成后将flag变为false
      console.log(wx.getStorageSync("arealist"))
      wx.setStorageSync("citychange", false)
    }
  },
  toCity:function(){
    wx.navigateTo({
      url: '../city/city',
    })
  },
  toHx:function(){
    wx.navigateTo({
      url: '../hx/hx',
    })
  },
  tosaixuan:function(){
    wx.navigateTo({
      url: '../saixuan/saixuan',
    })
  },
  toliveserver:function(){
    var that = this;
    wx.navigateTo({
      url: '../liveserver/liveserver',
    })
  },
  toupfix:function(){
    var that = this;
    wx.navigateTo({
      url: '../upfix/upfix',
    })
  },
  tofdauth:function(){
    var that = this;
    if(wx.getStorageSync('isFd')=="yes"){
      wx.navigateTo({
        url: '../fd_cz/fd_cz',
      })
    }else{
      wx.navigateTo({
        url: '../fdAuth_new/fdAuth_new',
      })
    }
    
  },
  tohousedetail:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.houseSets;
    var obj = {};
    for(var i=0;i<arr.length;i++){
      if(arr[i].id == id){
        obj = arr[i];
        break;
      }
    }
    // console.log(JSON.stringify(obj))
    wx.navigateTo({
      url: '../housedetail/housedetail?obj='+JSON.stringify(obj),
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